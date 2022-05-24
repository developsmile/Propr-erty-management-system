// store data of property 
 var propertyData = [];
// filter btn events work code
let filterbtn = document.querySelector('.filter-btn');
let filterbox = document.querySelector('.filter-box');
filterbtn.addEventListener('click',()=>{
    let display1 = filterbox.style.display;
    filterbox.style.display = display1==="block"?"none":"block";
})

let propertybox = document.querySelector('.add-property-box');

// add property in section box
let propertyName = document.querySelector('.property-name');
let propertySize = document.querySelector('.property-size');
let propertyDesc = document.querySelector('.property-desc');
const addproperty = (e)=>{
    appendProperty(propertyName.value,propertySize.value,propertyDesc.value);
    propertyName.value = "";
    propertySize.value = "";
    propertyDesc.value = "";
}

let sectionProperty = document.querySelector('section')
// append property in section box 
const appendProperty = (name,size,desc)=>{
    let id1 = "ac"+Math.round(Math.random()*1000);
    if(name==="" || size==="" || desc ===""){
        window.alert("All Field are compolusory");
        return ;
    }
    let data = {id:id1,name,size,desc}
    propertyData.push(data);
    moveBox();
    addLocaldata(data);
    addPropertyData(data);
}

// add data in local storage 
const addLocaldata = (data)=>{
    let ldata = getLocalData();
    let data1 = [...ldata,data]
    setLocalData (data1)
}

// add property data in array
const addPropertyData = (data)=>{
        let maindiv = document.createElement('div');
        maindiv.classList.add("property-card");
        maindiv.setAttribute('id',data.id);
        maindiv.innerHTML = `
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500"
        alt="">
        <div class="detail">
            <h3> ${data.name} </h3><p>${data.desc}</p><p>${data.size} sq ft</p>
        </div>
        <button class="delete-btn" onclick="deletebox(${data.id})">delete</button>
        `;
        sectionProperty.appendChild(maindiv);
}

// delete the proerty card 
const deletebox = (id1)=>{
    propertyData = getLocalData();
    propertyData = propertyData.filter((item)=>item.id!==id1.id)
    setLocalData(propertyData)
    deleteAllProperty();
    showProperty(propertyData)
}

// move propert box
const moveBox = ()=>{
    if(propertybox.classList.toggle('visibleBox')){
        document.querySelector('.property-container').style.opacity=".3"
    }else{
        document.querySelector('.property-container').style.opacity="1"
    }
}
// sort elements 
const sortInc =async ()=>{
    let data = getLocalData();
    for(let i =1;i<data.length; i++){
        for(let j =i-1;j>=0;j--){
            if(Number(data[j].size) >= Number(data[j+1].size)){
                let temp = data[j];
                data[j] = data[j+1]
                data[j+1] = temp;
            }else{
                break;
            }
        }
    }
    await setLocalData(data)
    await deleteAllProperty();
    await showProperty(data)
    filterbox.style.display="none";
}
const sortDec = async ()=>{
    let data = await getLocalData();
    for(let i =1;i<data.length; i++){
        for(let j =i-1;j>=0;j--){
            if(Number(data[j].size) >= Number(data[j+1].size)){
                let temp = data[j];
                data[j] = data[j+1]
                data[j+1] = temp;
            }else{
                break;
            }
        }
    }
    let i =0;
    let j =data.length-1;
    while(j>i){
        let temp = data[i];
        data[i] = data[j]
        data[j] = temp;
        i++;
        j--;
    }
    await deleteAllProperty();
    await showProperty(data)
    filterbox.style.display="none";
}

// when window load then all data fetch
// from local storage and display in section div
const load= ()=>{
    let pdata = getLocalData();
    showProperty(pdata);
}

// delete all data from section
const deleteAllProperty= ()=>{
    let divdata = document.querySelectorAll('.property-card');
    for(let i =0; i<divdata.length;i++){
        divdata[i].remove();
    }
}

// show property data in section div 
const showProperty = (data)=>{
    data.map((item)=>{
        addPropertyData(item);
    })
}
// get data from localstorage
const getLocalData = ()=>{
    return JSON.parse(localStorage.getItem('pData'));
}
// set data in localstorage
const setLocalData = (data)=>{
    localStorage.setItem('pData',JSON.stringify(propertyData))
}