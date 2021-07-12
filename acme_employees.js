const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  spacer('findEmployeeByName')
  function findEmployeeByName(employeeName, employees){
      for (let item of employees){
          if (item.name===employeeName){
              return item
          }
      }
  }

  // given a name and array of employees, return employee
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  spacer('findManagerFor Shep Jr.')
  //given an employee and a list of employees, return the employee who is the manager
 function findManagerFor(employee, employees){
     for (let item of employees) {
             if (item.id===employee.managerId){
             return item
             }
     }
     return null //edge case 
    } 
 
 
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  spacer('findCoworkersFor Larry')
  function findCoworkersFor(employee,employees){
    let colleagueList=[]
    for (let item of employees) {  
            if (item.managerId===employee.managerId && item.name!==employee.name){
                colleagueList.push(item)
            }
    }
    return colleagueList 
  }
  
  //given an employee and a list of employees, return the employees who report to the same manager
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  
  spacer('');
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
 
  function findManagementChainForEmployee(employee, employees){
      let managerChain=[]
      managerChain.push(employee)
      while(findManagerFor(managerChain[0],employees)){  //while the manager exists
        managerChain.unshift(findManagerFor(managerChain[0],employees));
      }
      managerChain.pop()
    return managerChain
}
  
  
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');
  
  spacer('generateManagementTree')
  //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
 
  function generateManagementTree(employees){
    for (let employee of employees){
      if(!employee.managerId){
        var finalObj={...employee}
      }
    }
    function addEmployee(obj){
      let reports=[]
      for (let employee of employees){
        if(employee.managerId===obj.id){
          reports.push(employee)
        }
      }
      obj.reports=reports
      if(obj.reports.length>0){
        obj.reports.forEach(ele=>addEmployee(ele))
      }
    }
    
    addEmployee(finalObj)

    return finalObj
  }
  
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
 
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */

  spacer('');  
  spacer('displayManagementTree')
  //given a tree of employees, generate a display which displays the hierarchy
  
  function displayManagementTree(managementTree){
    let n=0
    let employeeName=managementTree.name 
    let dash=new Array(n).fill('-').join('')  
    console.log(`${dash}${employeeName} \n`) //base case
    n+=1    //closure
    let subordinate=managementTree.reports
    if(subordinate){
      subordinate.forEach(ele=>displayManagementTree(ele)) 
    }
    //recursive case
  }

  displayManagementTree(generateManagementTree(employees));/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */



    /*
    bottom-up trials#1
   
    let newObj={}
    for (let employee of employees){
      var max=0
      let numOfManager=findManagementChainForEmployee(employee, employees).length
      employee["reports"]=[ ]
      newObj[employee]=numOfManager
      if(numOfManager>max){
        max=numOfManager 
      }
    }
    // construct the tree from those with most numOfManager; max=largest
    while (max>0){
      for(let item in newObj){
       if (newObj[item]===max){
           for(let item2 in newObj){
             if(item2.id===item.managerId){
              item2["reports"].push(item) //step#1:search for the direct root and attached it to the reports
              delete newObj.item//step#2: delete the attached item
              }
             }
           }
        }
        max-=1
    }
    return Object.keys(newObj)[0]

    //bottom-up trial#2
    var newObj={}
    for (let item of employees){
      newObj[item.id]=item
    }
   //help function to find the manager
    function attachToManager(item,newObj){
      if(item.managerId){ //it has a manager
        for (let i in newObj){
         if (i===item.managerId){
          if(!newObj[i].reports){
            newObj[i].reports=[] //create reports if havent
           }
           newObj[i].reports.push(item) //step#1:search for the direct root and attached it to the reports
           delete newObj.item['id']//step#2: delete the attached item
          }
          else{
            if(newObj[i].reports){
            let lowObj={};
            for (let item of newObj[i].reports){
              lowObj[item.id]=item
            }
            attachToManager(item,lowObj) 
           }  
          }
      }
     }
    }
    for(let item of employees){
    attachToManager(item,newObj)
    }

     return newObj
    }
    /*