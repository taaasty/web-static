###* @jsx React.DOM ###

window.HeroProfileActions = React.createClass

  render: ->
   `<div className="hero__actions">
      <FollowButton tlogId={ 37623 }
                    relationship={{ "tlogId":37623, "relationship":{"id":null, "user_id":37623, "reader_id":232992, "position":null, "status":0, "state":"none"} }}>
        <button className="follow-button">Подписаться</button>
      </FollowButton>
    </div>`