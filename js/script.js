/**
 * Author: Mubashir Ahmad
 * Github: @hakerbaya
 * Personal Project:
 *                   ┏━━━┓ ┏━━━┓ ┏┓︱︱┏┓ ┏━━┓ ┏━━━┓ ︱┏┓︱ ┏━━━┓
                     ┃┏━┓┃ ┃┏━┓┃ ┃┗┓┏┛┃ ┗┫┣┛ ┗┓┏┓┃ ┏┛┃︱ ┃┏━┓┃
                     ┃┃︱┗┛ ┃┃︱┃┃ ┗┓┃┃┏┛ ︱┃┃︱ ︱┃┃┃┃ ┗┓┃︱ ┃┗━┛┃
                     ┃┃︱┏┓ ┃┃︱┃┃ ︱┃┗┛┃︱ ︱┃┃︱ ︱┃┃┃┃ ︱┃┃︱ ┗━━┓┃
                     ┃┗━┛┃ ┃┗━┛┃ ︱┗┓┏┛︱ ┏┫┣┓ ┏┛┗┛┃ ┏┛┗┓ ┏━━┛┃
                     ┗━━━┛ ┗━━━┛ ︱︱┗┛︱︱ ┗━━┛ ┗━━━┛ ┗━━┛ ┗━━━┛
 */ 

let totalConfirmed = 0,totalRestored = 0, totalDeceased = 0;
   let IDS = {
    search : "#search",
    totalconfirmed: "#totalConfirmed",
    totalrestored: "#totalRestored",
    totaldeaths : "#totalDeceased",
    piechart : "#chart1",
   }
  let CLASSES = {
    loader: ".loader"
   }
  
   function $(element){
    return document.querySelector(element);
  }
   // Add Loader
    function addLoader(){
      let loaders = document.querySelectorAll(CLASSES.loader);
      console.log(loaders);
      loaders.forEach((loader)=>{
        loader.classList.add("showLoader");
        loader.classList.remove("hideLoader")
      });}
  // Remove Loader: When Data is being Successfully fetched.
  function removeLoader(){
  let loaders = document.querySelectorAll(CLASSES.loader);
    loaders.forEach((loader)=>{
      loader.classList.add("hideLoader");
      });}
  // Detect Double Tap To Switch to Dark Mode
  function doubleTap(){
        var lastTap=0;
        var timeout;
        $("h1").addEventListener('click', function(event) {
            var currentTime = new Date().getTime();
            var tapLength = currentTime - lastTap;
            clearTimeout(timeout);
            if (tapLength < 500 && tapLength > 0) {
                darkMode();} 
            lastTap = currentTime;
        });}
  function searchCountry() {
      var input, filter, table, tr, td, i, txtValue;
        input = $("#search");
        filter = input.value.toUpperCase();
        tr = document.querySelectorAll("tr");
        for (i = 1; i < tr.length; i++) {
          th = tr[i].getElementsByTagName("th")[0];
          if (th) {
            txtValue = th.textContent || th.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              } else {
              tr[i].style.display = "none";
                }
              }
            }
        }

    // Function To Change Styles when switching to Dark Mode.
    function darkMode(){
        $("span").classList.toggle("darkMode");
        $("#mytag").classList.toggle("darkMode");
        $("body").classList.toggle("darkMode");
        $("h1").classList.toggle("darkMode");
        let allTh = document.querySelectorAll("tbody tr th");
        allTh.forEach((th)=>{
            th.classList.toggle("darkMode");
        });
        let allTd = document.querySelectorAll("tbody tr td");
        allTd.forEach((td)=>{
            td.classList.toggle("darkMode");
        });}

        function getCovidData(){
          fetch('https://pomber.github.io/covid19/timeseries.json')
           .then((response) => {
           return response.json();
           })
           .then((data) => {
                for(let i=0;i<Object.keys(data).length;i++){
                      totalConfirmed = totalConfirmed + Object.values(data)[i][Object.values(data)[i].length-1].confirmed;
                      totalRestored = totalRestored + Object.values(data)[i][Object.values(data)[i].length-1].recovered;
                      totalDeceased = totalDeceased + Object.values(data)[i][Object.values(data)[i].length-1].deaths;
                      
                      $("tbody").innerHTML+=`
                        <tr>
                          <th>${Object.keys(data)[i]}</th>
                          <td>${Object.values(data)[i][Object.values(data)[i].length-1].confirmed}</td>
                          <td>${Object.values(data)[i][Object.values(data)[i].length-1].recovered}</td>
                          <td>${Object.values(data)[i][Object.values(data)[i].length-1].deaths}</td>
                        </tr>`
                    }   removeLoader();
                        // Total Confirmed : Manipulate DOM
                        $(IDS.totalconfirmed).innerHTML = `<p>CONFIRMED</p>${totalConfirmed}`;
                        $(IDS.totalrestored).innerHTML = `<p>RESTORED</p>${totalRestored}`;
                        $(IDS.totaldeaths).innerHTML = `<P>DEATHS</P>${totalDeceased}`;
                        let chartData = {
                          labels: ["Confirmed","Restored","Deceased"],
                          series: [totalConfirmed,totalRestored,totalDeceased]
                        };
                        new Chartist.Pie(IDS.piechart, chartData);
             });
       }
(()=>{
 getCovidData();
 doubleTap();
})();
  




  


