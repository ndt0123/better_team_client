import React, {Component} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinSquintTears, faPaperPlane, faReply, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.onClickCloseThreadBtn = this.onClickCloseThreadBtn.bind(this);

    this.state = {
      messageContent: '',
      replyMessageContent:'',
      thread: {
        active: false,
        message_index: 0
      }
    }
  }

  onClickCloseThreadBtn() {
    this.setState({
      thread: {
        active: false,
        message_index: 0
      }
    })
  }

  render() {
    return(
      <div className="col-12 row box-message">
        <div className={this.state.thread.active ? 
          "child-box-message col-8" : "child-box-message col-12"}>
          <div className="messages">
            {
              this.props.messages.map((message, index) => (
                <div key={index} className="message-item">
                  <div className="avatar">
                    <img src={"/default-avatar.jpg"} alt="Avatar" />
                  </div>
                  <div className="message-info">
                    <div className="name-time">
                      <span className="name">{message.user_name} </span>
                      <span className="time">{message.time}</span>
                    </div>
                    <div className="content">
                      <p>{message.content}</p>
                    </div>
                    <div 
                      onClick={() => {
                        this.setState({
                          thread: {
                            active: true,
                            message_index: index
                          }
                        })
                      }}>
                      {
                        message.reply_messages.length == 1 ?
                        <div className="reply-button">
                          <FontAwesomeIcon icon={faReply} className="fa-xs" /> 1 reply
                        </div> :
                          message.reply_messages.length > 1 ?
                            <div className="reply-button">
                              <FontAwesomeIcon icon={faReply} className="fa-xs" /> {message.reply_messages.length} replies
                            </div> : ""
                      }
                    </div>
                  </div>
                  
                  <div className="message-option">
                    <div className="icon"
                      data-tip data-for="replyBtnTooltip"
                      onClick={() => {
                        this.setState({
                          thread: {
                            active: true,
                            message_index: index
                          }
                        })
                      }}>
                      <FontAwesomeIcon icon={faReply} className="fa-xs" />
                    </div>
                    <div className="icon" data-tip data-for="reactionBtnTooltip">
                      <FontAwesomeIcon icon={faGrinSquintTears} className="fa-xs" />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="col-12 box-input-message message">
            <div className="input-message float-right">
              <TextareaAutosize
                className="form-control"
                placeholder="Type message here"
                rows={1}
                value={this.state.messageContent}
                onChange={(e) => {
                  this.setState({
                    messageContent: e.target.value
                  })
                }}
              />
              <div className="submit-btn"
                onClick={() => {
                  this.props.onClickSendMessage(this.state.messageContent)
                  this.setState({
                    messageContent: ''
                  })
                }}>
                <FontAwesomeIcon icon={faPaperPlane} className="fa-1x"/>
              </div>
            </div>
          </div>
        </div>

        <div className={this.state.thread.active ? 
          "box-thread col-4 active" : "box-thread inactive"}>
          <div className="row thread-header">
            <div className="left">
              <span>Thread</span>
            </div>
            <div className="right" onClick={this.onClickCloseThreadBtn}>
              <FontAwesomeIcon icon={faTimes} className="fa-1x"/>
            </div>
          </div>

          {
            this.props.messages[this.state.thread.message_index] != undefined ?
            
            <div className="messages">
              <div className="message-item">
                <div className="avatar">
                  <img src={"/default-avatar.jpg"} alt="Avatar" />
                </div>
                <div className="message-info">
                  <div className="name-time">
                    <span className="name">{this.props.messages[this.state.thread.message_index].user_name} </span>
                    <span className="time">{this.props.messages[this.state.thread.message_index].time}</span>
                  </div>
                  <div className="content">
                    <p>{this.props.messages[this.state.thread.message_index].content}</p>
                  </div>
                </div>
                
                <div className="message-option">
                  <div className="icon" data-tip data-for="reactionBtnTooltip">
                    <FontAwesomeIcon icon={faGrinSquintTears} className="fa-xs" />
                  </div>
                </div>
              </div>
              <div className="custom-label">
                <div className="wid-100per">
                  <h5>
                    {this.props.messages[this.state.thread.message_index].reply_messages.length} replies
                    <span></span>
                  </h5>
                </div>
              </div>
              
              {
                this.props.messages[this.state.thread.message_index].reply_messages.map((message, index) => (
                  <div key={index} className="message-item">
                    <div className="avatar">
                      <img src={"/default-avatar.jpg"} alt="Avatar" />
                    </div>
                    <div className="message-info">
                      <div className="name-time">
                        <span className="name">{message.user_name} </span>
                        <span className="time">{message.time}</span>
                      </div>
                      <div className="content">
                        <p>{message.content}</p>
                      </div>
                    </div>
                    
                    <div className="message-option">
                      <div className="icon" data-tip data-for="reactionBtnTooltip">
                        <FontAwesomeIcon icon={faGrinSquintTears} className="fa-xs" />
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="col-12 box-input-message thread">
                <div className="input-message float-right">
                  <TextareaAutosize
                    className="form-control"
                    placeholder="Type message here"
                    rows={1}
                    onChange={(e) => {
                      this.setState({
                        replyMessageContent: e.target.value
                      })
                    }}
                    value={this.state.replyMessageContent}
                  />
                  <div className="submit-btn"
                    onClick={() => {
                      let message_id = this.props.messages[this.state.thread.message_index].id;
                      let content = this.state.replyMessageContent;
                      this.props.onClickSendReplyMessage(message_id, content);
                      this.setState({
                        replyMessageContent: ''
                      })
                    }}>
                    <FontAwesomeIcon icon={faPaperPlane} className="fa-1x"/>
                  </div>
                </div>
              </div>
            </div> : ""
          }
        </div>

        <ReactTooltip id="replyBtnTooltip" place="top" effect="solid">
          Reply
        </ReactTooltip>
        <ReactTooltip id="reactionBtnTooltip" place="top" effect="solid">
          Reaction
        </ReactTooltip>
      </div>
    );
  }
}

export default Messages;
