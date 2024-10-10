<template>
  <div class="recommend">
    <div class="recommend-head">
      <span>Who to follow</span>
    </div>
    <div class="people-list">
      <div class="people-card">
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="people-des">
          <div class="people-username">
            <span>Judy Nguyan</span>
          </div>
          <div class="describe">
            <span>News anchor</span>
          </div>
        </div>
        <div class="action">
          <span>+</span>
        </div>
      </div>
      <div class="people-card">
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="people-des">
          <div class="people-username">
            <span>Judy Nguyan</span>
          </div>
          <div class="describe">
            <span>News anchor</span>
          </div>
        </div>
        <div class="action">
          <span>+</span>
        </div>
      </div>
      <div class="people-card">
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="people-des">
          <div class="people-username">
            <span>Judy Nguyan</span>
          </div>
          <div class="describe">
            <span>News anchor</span>
          </div>
        </div>
        <div class="action">
          <span>+</span>
        </div>
      </div>
      <div class="people-card">
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="people-des">
          <div class="people-username">
            <span>Judy Nguyan</span>
          </div>
          <div class="describe">
            <span>News anchor</span>
          </div>
        </div>
        <div class="action">
          <span>+</span>
        </div>
      </div>
      <div class="people-card">
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="people-des">
          <div class="people-username">
            <span>Judy Nguyan</span>
          </div>
          <div class="describe">
            <span>News anchor</span>
          </div>
        </div>
        <div class="action">
          <span>+</span>
        </div>
      </div>
    </div>
    <div class="recommend-footer">
      <div class="view-more">
        <span> View more </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend {
  background-color: #fff;
  height: 390px;
  padding: 10px 15px;
  .recommend-head {
    margin-bottom: 15px;

    span {
      letter-spacing: 0.6px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .people-list {
    display: flex;
    flex-wrap: wrap;
    .people-card {
      margin-bottom: 5px;
      width: 100%;
      position: relative;
      display: flex;
      .avatar {
        margin-right: 5px;
        img {
          border-radius: 25px;
          width: 50px;
        }
      }
      .people-des {
        .people-username {
          font-size: 15px;
          margin-top: 5px;
          margin-bottom: 2px;
          font-weight: bold;
        }
        .describe {
          font-size: 13px;
          color: #666;
        }
      }
      .action {
        font-size: 18px;
        padding: 6px 12px;
        color: #0f6eea;
        border-radius: 50%;
        background-color: #e7f0fd;
        position: absolute;
        right: 0px;
        margin-top: 5px;
      }
    }
  }
  .recommend-footer {
    width: 100%;
    .view-more {
      font-size: 15px;
      letter-spacing: 0.3px;
      font-weight: bold;
      color: #4292fb;
      background-color: #e7f0fd;
      width: 100%;
      padding: 8px;
      text-align: center;
    }
  }
}
</style>
