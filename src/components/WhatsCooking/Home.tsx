/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
import { List, Image,Card,Pagination,Segment,Flag } from 'semantic-ui-react'
import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { Initial } from 'react-initial';
// import {axios} from "axios";
import './Home.css'
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

// import MultipleSelect from 'react-multiple-select-dropdown';
// import 'react-multiple-select-dropdown/dist/index.css';

import {Modal, Container, Row, Col } from "reactstrap";
import { Cookies } from "js-cookie";
import { Draggable, Droppable } from 'react-drag-and-drop'
import {
  Header,
  Grid,
  Form,
  Input,
  Popup,
  Button,
  Message,
  Loader,
  Label,
  Icon,
  Menu,
  TextArea ,
  Checkbox
} from "semantic-ui-react";
import Select from 'react-select'
import SweetAlert from "sweetalert-react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import routes from "../../constants/routes.json";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.adapter = require('axios/lib/adapters/http');
const countries = [
  { name: 'brazilian', countryCode: 'br' },
  { name: 'british', countryCode: 'gb' },
  { name: 'chinese', countryCode: 'cn' },
  { name: 'filipino', countryCode: 'ph' },
  { name: 'french', countryCode: 'fr' },
  { name: 'indian', countryCode: 'in' },
  { name: 'irish', countryCode: 'ie' },
  { name: 'italian', countryCode: 'it' },
  { name: 'jamaican', countryCode: 'jm' },
  { name: 'japanese', countryCode: 'jp' },
  { name: 'korean', countryCode: 'kp' },
  { name: 'moroccan', countryCode: 'ma' },
  { name: 'mexican', countryCode: 'mx' },
  { name: 'russian', countryCode: 'ru' },
  { name: 'southern_us', countryCode: 'us' },
  { name: 'spanish', countryCode: 'es' },
  { name: 'thai', countryCode: 'th' },
  { name: 'vietnamese', countryCode: 'vn' },
  ]
type Props = {
 
};
export default function Home(props: Props) {
  const emoji = require("emoji-dictionary");

  const GoogleColors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];
  const [dataFetched, setDataFetched] = useState(false);

  const [query, setQuery] = useState("");
  const [cookie, setCookie] = useState("");
  
  const [K, setK] = useState(3);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [alert, setAlert] = useState({ status: false, title: "", text: "" });
  const [queryFetched, setQueryFetchStatus] = useState(false);
  const [LocalPostingList, setLocalPostingList] = useState([]);
  const [serverDown, setServerDown] = useState(false);
  const [resultyType, setResultType] = useState("set");
  const [modelProperties, setmodelProperties] = useState([]);
  const [choiceFunctions, setChoiceFunctions] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modte, setModal] = useState(false);  
  const [newTrainSize, setnewTrainSize] = useState(0.8);
  const [newTestSize, setnewTestSize] = useState(0.2);
  const [distanceFormula, setnewDistance] = useState('');
  const [labelDisplay, setLabel] = useState('');
  const [reIndex, setnewReIndex] = useState();
  const [List1, setList1] = useState(['Apple','Banana','Orange','Mango','Avocados','Blueberries','Cherries','Damson plum','Elderberry','Entawak','Dewberries','Cucumbers'])
  const [copyList,setCopy] = useState(['Apple','Banana','Orange','Mango','Avocados','Blueberries','Cherries','Damson plum','Elderberry','Entawak','Dewberries','Cucumbers'])
  const [List2, setList2] = useState([])
  const [value, setValue] = useState([])
  const [currentPage, setCurrent] = useState(1)
  const [TotalPages, setTotal] = useState(2)
  const [prevIndex, setPrev] = useState(0)
  const [lastIndex, setLast] = useState(9)
  const [listLength, setLength] =useState(copyList.length)
  const [Answer,setAnswer] = useState('italian')
  const [Countrycode, setCode] = useState('') 
  const [flag,setFlag] = useState(false)
  const getFlag = (Cname) =>{
    console.log("bahar",Cname)
    countries.map((item,index)=>{
      if(Cname===item.name){
        let code =item.countryCode
        console.log(code)
        setCode(code)
      }
    })
  }
  const flagRenderer = (item) => {
    return(
    <Flag name={item} />
  )
  }
  const getData = ()=>{
    if(flag===false){
      axios
        .get("/api/ingredients?limit=3000&offset=0")
        .then(response => {
          console.log(response.data.data)
          setList1(response.data.data)
          setCopy(response.data.data)
          setFlag(true)
          console.log(copyList)
          var i = 0;
          i = copyList.length;
          setLength(i);
          var a = listLength/10;
          a = Math.ceil(a)
          setTotal(a)
          return response;
        }).then(
          
        )
        .catch(err => {
          // setServerDown(true);
        });
    }
    else{
      return
    }
    
  }
  const onChangePage = (e) => {
    console.log(e.target.value)
    var val = e.target.value;
    
    if (e.target.value === '' || e.target.value === 0) {
      setCurrent(0)
    } else if (
      e.target.value === null ||
      e.target.value === undefined 
      // e.target.value === 0
    ) {
      return;
    } else if (e.target.value > TotalPages || e.target.value <= 0) {
      return;
    } else {
      var prev = (val - 1) * 10;
      var last = (val - 1) *10 + 9;
      setCurrent(val)
      setPrev(prev)
      setLast(last)
      
    }
  }

  const goBack = () => {
    if (currentPage - 1 > 0) {
      let cp = currentPage
      let pi = prevIndex
      let li = lastIndex
      setCurrent(cp-1)
      setPrev(pi-10)
      setLast(li-10)
      
    } else {
      return;
    }
  }

  const goForward = () => {
    if (currentPage + 1 > TotalPages) {
      return;
    } else {
      let cp = currentPage
      let pi = prevIndex
      let li = lastIndex
      console.log(typeof(cp))
      setCurrent(cp+1)
      setPrev(pi+10)
      setLast(li+10)
    }
  }


  const onSearch = (e) => {
    console.log(e.target.value)
    if (e.target.value === '') {
      setCopy(List1)
    }
    const searchValue = e.target.value.toLowerCase();
    var newData = [];
    List1.some(item => {
      if (item.toLowerCase().includes(searchValue)) {
        newData.push(item);
      }
    })
      if (newData) {
        setCopy(newData)
        var i = 0;
        i = copyList.length;
        console.log(i,copyList)
        setLength(i);
        var a = listLength/10;
        a = Math.ceil(a)
        setTotal(a)  
        
      } else {
        setCopy([])
      }
    
  } 
  const getValue = value => {
    setValue(value);
  };
  const getNewK = value => {
    setK(value);
  };
  const MODEL_NAME = 'KNN';
  const DATASET_NAME = 'bbcsport';
useEffect(() => {
    getData()
    var i = 0;
        i = copyList.length;
        console.log(i,copyList)
        setLength(i);
        var a = listLength/10;
        a = Math.ceil(a)
        setTotal(a)
    // fetchData();
    if(copyList.length<10){
      setCurrent(1)
      setPrev(0)
      setLast(9)
    }
  });
  const getprediction = () =>{
    setLoadingStatus(true)
    const formd = new FormData();
    formd.append("dataset", 'whats-cooking');
    formd.append("query", List2.join(','));
    const res = axios
      .post("/api/predict/RandomForestClassifier", formd, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        setLoadingStatus(false)
        return response;

      })
      .catch(e => console.error(e));
      setLoadingStatus(false)
  }
  const handleCreate2 = (e,name)=> {
    console.log(name.name)
    let ingridient = name.name;
    let array1 = List2
    let array2 = List1
    array2.push(ingridient)
    getValue(array2);
    array1=array1.filter(function(item){
      return item !== ingridient
  })
    setList2(array1)
    setCopy(array2)
    setList1(array2)
    var i = 0;
        i = copyList.length;
        setLength(i);
        var a = listLength/10;
        a = Math.ceil(a)
        setTotal(a)
  }
  const handleCreate = (e,name)=> {
    console.log(name.name)
    let ingridient = name.name;
    let array1 = List2
    let array2 = List1
    // var item=name;
    array1.push(ingridient)
    getValue(array1);
    array2=array2.filter(function(item){
      return item !== ingridient
  })
    setList2(array1)
    setCopy(array2)
    setList1(array2)
    var i = 0;
        i = copyList.length;
        setLength(i);
        var a = listLength/10;
        a = Math.ceil(a)
        setTotal(a)
  }
  const onDragEnd = () => {
    console.log("Drag End")
  }

  return (
    <>
    <Menu stackable inverted pointing secondary>
        <Menu.Item>
          IR - AI Project
        </Menu.Item>

        <Menu.Item
          name='WhatsCooking'
          active={true}
          
          onClick={()=> window.location.href = '/#/WhatsCooking'}
        >
          Whats Cooking ? 🍳🍪
        </Menu.Item>
        
        {
          console.log(modte)
        }
      </Menu>
       
      <Modal show={modte} onHide={()=>{setModal(!modte)}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
        {
     countries.map((item,index)=>{
      if(Countrycode===item.name){
        let code =item.countryCode
        console.log(code)
        return(
          <Flag size="5" name={'br'} />
        )
      }
    })
   }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setModal(false)}}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          verticalAlign: "middle",
          marginBottom: "20px"
        }}
      >
        <h1 style={{ fontSize: 65 }}>
          {"WhatsCooking".split("").map((letter, index) => (
            <span
              key={letter + index}
              style={{ color: GoogleColors[index % 4] }}
            >
              {letter}
            </span>
          ))}
        </h1>
        {/* <h1>Project - WhatsCooking</h1> */}
      </div>
      <Container  p="100px" l="10px">
      <div >

  <Row  style={{margin:'1rem',opacity:'1'}}>
    <Col  md="12">
    <Card id="mainCard"  style={{width:'100%',height:'43rem'}}>
      {/* </div> */}
      <Row>
<Col md="7" >
<Input style={{width:'102%', marginTop:"0.5rem", marginLeft: '0.5rem',marginRight: '0.5rem'}} icon='search' placeholder='Click on item to select...'  onChange={onSearch}/>

<Card.Content  style={{marginTop:'1rem',height:"34rem"}}>
 
<List divided relaxed>
    {
      copyList.map((item,index)=>{
        if (
          index <= lastIndex &&
          index >= prevIndex
        )
        return(
          <List.Item name={item}  key={index} onClick={(e,item)=>{handleCreate(e,item)}}>
      {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
      <List.Content>
        <List.Header as='a'>
        <span style={{marginLeft:'10px', marginRight:'1rem',borderRadius:'50%'}}>
      <Initial
                                          radius={50}
                                          height={35}
                                          width={40}
                                          seed={5}
                                          fontSize={20}
                                          name={item}
                                        />
        </span ><span style={{ color: GoogleColors[index % 4] }}>{item}</span></List.Header></List.Content>
    </List.Item>
        )
      })
    }
    
  </List>
  </Card.Content>
  <Card.Content extra  style={{float:"bottom",marginTop:'1rem'}}>
  <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            flexWrap: 'wrap',
                            padding: '3px'
                          }}
                        >
                          <span
                            style={{ paddingRight: '3px', marginTop: '0',marginLeft:'0.5rem' }}
                          >
                            <Button 
                             style={{border:'1px solid white',backgroundColor:"black",color:'white'}}   onClick={goBack} icon labelPosition='left'>
                <Icon className='left arrow' />
                        Previous
                      </Button>
                             </span>
                          <div
                            style={{
                              textAlign: 'center',
                              marginBottom: 0,
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-around'
                            }}
                          >
                            <span
                              style={{
                                color:"white",
                                display: 'inline',
                                paddingRight: '1rem',
                                fontSize: '14px',
                                // fontWeight: '400'
                              }}
                            >
                              Page
                            </span>
                            <span
                              style={{
                                color:"white",
                                display: 'inline',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                fontWeight: 'bold',
                                fontSize: '14px'
                              }}
                            >
                              {currentPage}
                            </span>
                            <span
                              style={{
                                color:"white",
                                display: 'inline',
                                paddingLeft: '1rem',
                                fontSize: '14px'
                              }}
                            >
                              of
                            </span>
                            <span
                              style={{
                                color:"white",
                                display: 'inline',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                fontWeight: 'bold',
                                fontSize: '14px'
                              }}
                            >
                              {TotalPages}
                            </span>
                          </div>
                          <span
                            style={{
                              display: 'inline',
                              paddingTop: '0',
                              marginRight: '-20px'
                            }}
                          >
                      <Button  onClick={goForward}
                      // content='Secondary'
                      style={{backgroundColor:"black",color:'white',border:'1px solid white'}}
                              icon labelPosition='right'>
                        Next
                        <Icon className='right arrow' />
                      </Button>
                   </span>
                        </div>
  </Card.Content>
  </Col>
  <Col md="5">
  {
    List2.length === 0 ? <Card id="mainCard1" style={{backgroundColor:"black",opacity:"0.9",width:'100%',height:'43rem'}}>
      <Card.Content>
      <h1 style={{textAlign:"center",color:'white',marginTop:'20rem'}}>
        No Data Selected
        ☹️
        </h1>
      </Card.Content>
    </Card> :
    <Card id="mainCard1" style={{width:'100%',height:'43rem',backgroundColor:"black",opacity:"0.9"}}>

<Card.Header style={{height:' 3rem',backgroundColor: 'black',}}>
<h4 style={{fontSize:'25px',marginTop:"0.25rem", verticalAlign:"middle",textAlign:"center",color:'white'}}>
        Selected Ingridients
      </h4>
</Card.Header>
<Card.Content style={{overflowY:"scroll"}}>
  <Row>
    {
      List2.map((item,index)=>{
        return(
          <Col style={{marginBottom:'0.5rem'}} key={index} xs={6}>
            <Card name={item}   onClick={(e,item)=>{handleCreate2(e,item)}}>
          <Card.Content  style={{backgroundColor:GoogleColors[index % 5],color:'black',fontWeight:'700',textAlign:'center '}}>
          {item}
            
          </Card.Content>
            </Card>
          </Col>
        )
      })
    }
  </Row>
  </Card.Content>
  <Card.Content extra>
   <div style={{float:'right'}}>
   <Button onClick={()=>{getprediction()}}>
      <span>
      {
        loadingStatus === true ? <Loader/>:null}
      
      Result
      </span>
    </Button>
   </div>
   
  </Card.Content>
  </Card>
  }
      
                  
  </Col>
  </Row>
  </Card >

    </Col>
  </Row>
  
   </div>
<br/>

      </Container>
      <SweetAlert
        show={alert.status}
        title={alert.title}
        text={alert.text}
        onConfirm={() => setAlert({ status: false, title: "", text: "" })}
      />
    </>
  );
}
// interface IProps {
// }

// interface IState {
//   value?: Array<string>;
//   selectedFields?: Array<string>,
//   valuesForMultiSelect?: Array<string>
// }
// class Selector extends Component<IProps, IState>{
//   constructor(props:Iprops) {
//     super(props);
//      this.state = {
//       value: [],
//       selectedFields: [],
//       valuesForMultiSelect: []
//     };
//   }
//   handleCreate(name) {
//     console.log(name);
//     // let { selectedFields, value } = this.state;

//     // let newOption = {
//     //   name,
//     //   id: this.state.selectedFields.length + 1
//     // };

//     // this.setState(
//     //   {
//     //     value: [...this.state.value, newOption], // select new option
//     //     selectedFields: [...this.state.selectedFields, newOption] // add new option to our dataset
//     //   },
//     //   () => {
//     //     console.log(this.state.value);
//     //   }
//     // );
//   }
//   render(){
//     return(
//       <div>
//         Ahsan
//       </div>
//     )
//   }
// }