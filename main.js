//( ͡° ͜ʖ ͡°)
function searching() {
  var requiredCourse;
  var recommendedCourse;
  let jsondata;
  var recommendedCoursesArray = [];
  var requiredCoursesArray = [];

  try {

    var x = document.getElementById("coursecode").value;
    /*fetch the json file from the yrl of the course code*/
    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
      function(u){return u.json();}
    ).then(function(json) {
    //turns json into a workable object
      jsondata = json;
      var jsonOBJ = jsondata;


      //adds data from the place required courses can be found to string

      if(jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility){
          var requiredCourse = jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility;
      }
      //adds data from the place recommended courses can be found to string
      if(jsonOBJ.course.prerequisites){
          var recommendedCourse = jsonOBJ.course.prerequisites;
      }

      //finds all coursecodes in the required courses string
      var i;

      for (i = 0; i < requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g).length; i++) {
        requiredCoursesArray.push((requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)[i]));
        //index zero since push pushes to first place in the array
        document.write(requiredCoursesArray[0] + " ");
      }

      //finds all coursecodes in the recommended courses string
      var i;

      for (i = 0; i < recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g).length; i++) {
        recommendedCoursesArray.push((recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)[i]));
        //index zero since push pushes to first place in the array
        document.write(recommendedCoursesArray[0] + " ");
      // console.log(recommendedCoursesArray[0] + " ");
      }

    /*pushing name of the course searched for, so that the index 0 of courses
    array always contains the name of the searched course, and the rest is two
    arrays with required and recommended courses*/
            var namn = new String(jsonOBJ.course.title);
            // recommendedCoursesArray.push(namn);
            console.log([namn , requiredCoursesArray, recommendedCoursesArray])
      
            return [namn , requiredCoursesArray, recommendedCoursesArray];

     }



    //).catch(error => console.error(error))
    ).catch(error => document.write(" HI"))
  }
  catch(err) {
    document.write("HIII");
    // document.getElementById("demo").innerHTML = err.message;
  }
}
