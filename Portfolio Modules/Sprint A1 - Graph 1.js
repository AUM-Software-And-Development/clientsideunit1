// Assign a reference value for the canvas in /Portfolio Assets/Sprint A1/Asset.html
let CanvasElement = document.getElementById("dataChart")

// The most recent income statistics for "Noah's Ark"
let ZooStatistics = {
   Perry: 19789,
   Harry: 14987,
   Sherry: 18762,
   Cherry: 91842
}

// Configuration settings to graph data in the form of a bar graph
let ConfigurationSettings = {
   type: "bar",
   data: {
      labels: ["Perry", "Harry", "Sherry", "Cherry"], 
      datasets: [{ label: "Value per capita", data: [19789, 14987, 18762, 91842]}]
   }
}

// Get canvas reference and assign it to align with the prior settings for the Chart class.
let DataChart = new Chart(CanvasElement, ConfigurationSettings)

let LowestProfit = 0
let HighestProfit = 0
let LowestProfitName = null
let HighestProfitName = null

/*
* Gets the highest profit by addition.
*/
GetHighestProfit = () =>
{
   let i = 0
   for (const property in ZooStatistics)
   {
      if (ZooStatistics[property] > HighestProfit)
      {
         HighestProfit = ZooStatistics[property]
         HighestProfitName = Object.keys(ZooStatistics)[i]
      }
      i++
   }
}

/*
* Gets the lowest profit by subtraction. Only feasible after highest profit is found.
*/
GetLowestProfit = () =>
{
   let i = 0
   LowestProfit = HighestProfit
   for (const property in ZooStatistics)
   {
      if (ZooStatistics[property] < LowestProfit)
      {
         LowestProfit = ZooStatistics[property]
         LowestProfitName = Object.keys(ZooStatistics)[i]
      }
      i++
   }
}

// Call the functions to get the data...
GetHighestProfit()
GetLowestProfit()


// Log the data outcomes for the user.
console.log("The highest profit comes from: " + HighestProfitName + ". The profit is: $" + HighestProfit)
console.log("The lowest profit comes from: " + LowestProfitName + ". The profit is: $" + LowestProfit)

if (LowestProfit === HighestProfit)
{
   console.log("Something strange is happening in the zoo.")
}

let HighestDivNode = document.querySelector(".Highest")
let LowestDivNode = document.querySelector(".Lowest")
let DifferenceDivNode = document.querySelector(".Difference")

HighestDivNode.innerHTML = "The highest profit comes from: " + HighestProfitName + ". The profit is: $" + HighestProfit;
LowestDivNode.innerHTML = "The lowest profit comes from: " + LowestProfitName + ". The profit is: $" + LowestProfit;
// Then find the difference
DifferenceDivNode.innerHTML = "The difference in profit between them is: $" + (HighestProfit - LowestProfit);