const axios = require("axios");
const cheerio = require("cheerio");

const link =
  "https://docs.google.com/document/u/0/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub?pli=1";

const rowMap = new Map();

async function printPattern(url) {
  try {
    const rows = await getRowsFromUrl(url);
    populateRowMap(rows);
    printRows();
  } catch (error) {
    console.error("Error in printPattern:", error);
  }
}

async function getRowsFromUrl(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const firstTable = $("table").first();

    if (firstTable.length === 0) {
      console.error("No tables found on the page.");
      return [];
    }

    const rows = [];
    firstTable.find("tr").each((_, row) => {
      const columns = [];
      $(row)
        .find("td, th")
        .each((_, cell) => {
          columns.push($(cell).text().trim());
        });
      rows.push(columns);
    });

    return rows;
  } catch (error) {
    console.error("Error fetching or parsing the document:", error);
    return [];
  }
}

function populateRowMap(rows) {
  rows.forEach((row) => {
    const [xCordStr, char, yCordStr] = row;
    const xCord = Number(xCordStr);
    const yCord = Number(yCordStr);

    if (isNaN(yCord)) return;

    if (rowMap.has(yCord)) {
      rowMap.set(yCord, [...rowMap.get(yCord), [xCord, char]]);
    } else {
      rowMap.set(yCord, [[xCord, char]]);
    }
  });
}

function printRows() {
  const rowKeyArr = [...rowMap.keys()].sort((a, b) => a - b);
  const maxRowNumber = rowKeyArr.at(-1);

  for (let i = 0; i <= maxRowNumber; i++) {
    if (rowMap.has(i)) {
      const columnsArr = rowMap.get(i);
      const colMap = new Map();

      columnsArr.forEach(([xCord, char]) => {
        colMap.set(Number(xCord), char);
      });

      const colKeyArr = [...colMap.keys()].sort((a, b) => a - b);
      const maxColNumber = colKeyArr.at(-1);

      const colCharArr = [];
      for (let j = 0; j <= maxColNumber; j++) {
        colCharArr.push(colMap.get(j) || " ");
      }
      console.log(colCharArr.join(""));
    } else {
      console.log("");
    }
  }
}

printPattern(link);
