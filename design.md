## LocalStorage
in localstorage we can -> delete, and save data
- data store in localstorage should be in string format
- json can pass/get multiple data into localstorage space in string format but seems like js object
- array ko convert krke localstorage me bhejna h
   and localstorage se data aaneke baad array me convert krna h
## JSON.parse -> converts that localstorage data into array format and returns to the user

 ## var arrOfDate = JSON.parse(localStorage.getItem("arrOfMemo")) || [];

 -> var arrOfDate;
    if(localStorage.getItem("arrOfMemo")) {
        arrOfDate = JSON.parse(localStorage.getItem("arrOfMemo"));
    } else {
        arrOfDate = []; 
    }

## css
1. when resolution minimizes -->> memos will hide and its all inner content
2. main ui i.e canvas ur thoughts will cover all the screen
3. three bar button will be visible on rhs
4. resizing the whole content of the body as per the screen resolution.

##  JS
1. when click on the three line bar it will get open and approx it will take 90% of the space 
2. when that aside bar will open so it will contain cross button to close it 
3. contraints --> a). empty data will not be stored
    b). as we write diary only once in a day so  data on the same date will get override
4. date will chnge daily 
5. data written on the input will get store date wise in aside /memos section
6. aside/memos section will only show the date not the data written inside it
7. when click on the date in aside section it will display the data written on the input section
8. when the diary writing gets cmplt ,save the data or clr the data 
and once save or clr the input box will get empty
9. in the memos section when we click/ select the particular date and clicked on the clear all data so it will do.

when we store date and msg so it will get store in localstorage
1. while storing in localstorage , we need to consider ->>
    # for date ->
    - save date in localstorage
    - check if date already exists or not 
    - if exists -> then override it
    - if not -> then store new date in localstorage
