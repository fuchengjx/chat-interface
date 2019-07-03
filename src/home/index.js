import React from 'react';
import { connect } from 'react-redux';
import { addInputItem, changeInputValue, toGetResponse } from './store/actionCreators';

const Home = (props) => {
  return (
<div style={styles.container}>
        <div style={styles.header}>
          我是智能分类机器人助手
        </div>
        <div style={styles.content}>
          {
            props.list.map((item, index) => {
              return ( 
              <div key={index}>
                <div style={styles.content.item}>{item}</div>
                <div style={styles.content.response}>{props.response[index]}</div>
              </div>
              )
            }) 
          }
        </div>
        <div style={styles.footer}>
          <input style={styles.footer.input} value={props.inputValue} onChange={ props.handleInputValue }></input>
          <button style={styles.footer.button} onClick={() => {props.handBtnClick(props)} }>发送</button>
        </div>
      </div>
  )
}


const styles = {
  container : {
    maxWidth: '420px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header: {
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    background: 'green',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  footer: {
    maxWidth: '420px',
    width: '100%',
    display: 'flex',
    background: '#33333',
    input: {
      flex: '1',
      height: '50px',
      lineHeight: '50px',
      fontSize: '20px',
    },
    button: {
      width: '50px',
      height: '50px',
    }
  },
  
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
    response: state.resList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputValue(e) {
      const action = changeInputValue(e.target.value)
      dispatch(action)
    },
    handBtnClick(props) {
      const action = addInputItem()
      dispatch(action)
      const param = {"name": props.inputValue}
      // console.log("param", param)
      const resAction = toGetResponse(param)
      dispatch(resAction)
    },

    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);