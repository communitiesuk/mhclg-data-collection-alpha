function matchDataColumns(ours, theirs){
  // Match on most words in common.
  const automapping = {}

  $.each(ours, function(i, column){
    let mostInCommon = getMostWordsInCommon(column, theirs);
    automapping[column] = mostInCommon;
  })

  return automapping;
}

function getMostWordsInCommon(column, columnsToMatch){
  let wordsInCommonCounts = {};
  let wordsInColumn = nlp(column); //column.toLowerCase().split(/\s+/);
  console.log(wordsInColumn.nouns().json())

  // $.each(columnsToMatch, function(i, columnName){
    // let words = nlp(columnName.toLowerCase().split(/\s+/));
    // words.forEach(function(word){
      // if (wordsInColumn.includes(word)){
        // increment(columnName, wordsInCommonCounts)
      // }
    // })
  // });

  return wordsInCommonCounts;
}

function increment(item, dictionary){
  if (! (item in dictionary)){
    dictionary[item] = 0;
  }

  dictionary[item]++;
}

function findBestMatches(){
  return matchDataColumns(ourColumns, theirColumns);
}

const bestMatches = findBestMatches()
