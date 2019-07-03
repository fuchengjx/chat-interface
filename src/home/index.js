import React from 'react';
import { connect } from 'react-redux';
import { addInputItem, changeInputValue, toGetResponse } from './store/actionCreators';

const Home = (props) => {
  return (
      <div style={styles.container}>
        {
          console.log("iiiiiii")
        }
        <div style={styles.header}>
          我是智能垃圾分类机器人助手
        </div>
        <div style={styles.content}>
          {
            props.list.map((item, index) => {
              return ( 
              <div key={index}>
                <div style={styles.content.item}>
                  <div style={styles.content.msg}>
                    <span style={styles.content.item.info}>{item}</span>
                  </div>
                  <img style={styles.avator} alt='你的头像' src="http://img.flura.cn/chatAvatar.png"></img>
                </div>
                <div style={styles.content.response}>
                <img style={styles.avator} src="http://img.flura.cn/robot.jpg"></img>
                  <div style={styles.content.msg}>
                    <span style={styles.content.response.info}>{props.response[index]}</span>
                  </div>           
                </div>
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
    position: 'relative',
    maxWidth: '420px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    color: 'white',
  },
  header: {
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    background: '#01AFFF',
  },
  avator: {
    width: '45px',
    height: '45px',
    margin: '0 10px',
    border: '0',
    borderRadius: '50%',
  },
  content: {
    position: 'fixed',
    top: '50px',
    bottom: '55px',
    overflowY: 'auto',
    flex: 1,
    width: '100%',
    background: '#F1F2F7',
    msg: {
      width: '75%',
      position: 'relative',
    },

    item: {
      display: 'flex',
      justifyContent: 'flex-end',
      textAlign: 'right',
      margin: '10px 0',
      info: {
        display: 'inline-block',
        padding: '10px 15px',
        backgroundColor: '#1FBAFC',
        boxShadow: '0px 0px 2px #1FBAFD',
        borderRadius: '15px',
      },
    },

    response: {
      display: 'flex',
      justifyContent: 'flex-start',
      textAlign: 'left',
      info: {
        display: 'inline-block',
        padding: '10px 10px',
        background: '#ffffff',
        borderRadius: '15px',
        color: 'black',
        wordWrap: 'break-word',
      }
    }

  },
  footer: {
    position: 'fixed',
    bottom: '0',
    maxWidth: '420px',
    paddingTop: '5px',
    width: '100%',
    display: 'flex',
    background: '#ececf4',
    height: '50px',
    lineHeight: '50px',
    input: {
      flex: '1',
      marginLeft: '10px',
      paddingLeft: '15px',
      height: '40px',
      lineHeight: '40px',
      fontSize: '20px',
      border: 'none',
      borderRadius: '20px',
      outline: 'none',
    },
    button: {
      width: '70px',
      height: '40px',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: '50%',
      border: 'none',
      background: '#1FBAFC',
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
      if (props.inputValue !== '') {
        const action = addInputItem()
        dispatch(action)
        const param = {"name": props.inputValue}
        // console.log("param", param)
        const resAction = toGetResponse(param)
        dispatch(resAction)
      } else {
        console.log("input不能为空")
      }
    
    },

    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);