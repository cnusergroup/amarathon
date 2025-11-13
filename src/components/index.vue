<template>
  <div class='amarothon12' role="main">
    <header class='amarothon12--poster' role="banner" aria-label="Amarathon 12-hour event banner"></header>
    <nav class='amarothon12--tabs-box' role="navigation" aria-label="Main navigation">
      <div class='amarothon12--tabs-box--tabs' role="tablist">
        <button
          v-for='tab in tabs'
          :key='tab.id'
          class='amarothon12--tabs-box--tabs--tab'
          :class='{ "amarothon12--tabs-box--tabs--tab__active": activeTab === tab.id }'
          @click='changeTab(tab.id)'
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :id="`tab-${tab.id}`"
        >
        <span class="amarothon12--tabs-box--tabs--tab--title">{{ tab.title }}</span>
        <span class="amarothon12--tabs-box--tabs--tab--subtitle">{{ tab.titleEn }}</span>
        </button>
      </div>
    </nav>
    <section v-if='activeTab === 0' class='amarothon12--home' role="tabpanel" :id="`panel-0`" :aria-labelledby="`tab-0`">
      <div class='amarothon12--home--desc-box'>
        <div class='amarothon12--home--desc-box--desc'>
          <div class='amarothon12--home--desc-box--desc--text' role="img" aria-label="Amarathon event description"></div>
          <div class="amarothon12--home--desc-box--desc--btns">
            <a
              v-if='status === 0'
              class='amarothon12--home--desc-box--desc--btns--btn'
              :href='signUpUrl'
              target='_blank'
              rel='noopener noreferrer'
            >立即报名观看Amarathon12小时直播（中文观众）</a>
            <a
              v-if='status === 0'
              class='amarothon12--home--desc-box--desc--btns--btn'
              :href='questionnaireUrl'
              target='_blank'
              rel='noopener noreferrer'
            >Book the 12-Hour Amarathon LiveStream now! （Global Audience）</a>
            <a
              v-if='status === 1'
              class='amarothon12--home--desc-box--desc--btns--btn'
              :href='liveUrl'
              target='_blank'
              rel='noopener noreferrer'
              >观看直播（Watch live stream）</a>
            <!-- <a
              v-if='status === 2'
              class='amarothon12--home--desc-box--desc--btns--btn'
              :href='liveUrl'
              target='_blank'
              rel='noopener noreferrer'
              >直播已结束（Live Ended）</a> -->
            <span
              v-if='status === 2'
              class='amarothon12--home--desc-box--desc--btns--btn btn_disabled'>直播已结束（Live Ended）</span>
          </div>
          <div class="amarothon12--home--desc-box--desc--href">
            <a href="https://space.bilibili.com/418158141/channel/collectiondetail?sid=4250716" target="_blank" rel="noopener noreferrer">观看直播回放单人cut，欢迎访问B站Amarathon专题页</a>
          </div>
        </div>
      </div>
      <div class='amarothon12--home--schedule-box'>
        <div class='amarothon12--home--schedule-box--desc'>
          <a
            class='amarothon12--home--schedule-box--desc--link'
            href='https://join.slack.com/t/awsgcrusergroup/shared_invite/zt-2uepy27c7-VRAm~lXBByNhFGnQdTx6aA'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
          <a
            class='amarothon12--home--schedule-box--desc--link2'
            href='https://dev-media.amazoncloud.cn/terms-of-events/terms%20and%20conditions.pdf'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
        </div>
      </div>
      <div class='amarothon12--home--speaker-box'>
        <div class='amarothon12--home--speaker-box--speaker'>
        </div>
      </div>
      <section class='amarothon12--home--partner-box' aria-label="Event partners and sponsors">
        <div v-for="(item, index) in partners" :key="index" class='amarothon12--home--partner-box--item'>
          <h2 class='amarothon12--home--partner-box--item--title'>{{ item.title }}</h2>
          <div class='amarothon12--home--partner-box--item--logos'>
            <a  v-for="(logo, idx) in item.logos" :key="idx" :href="logo.link" class="amarothon12--home--partner-box--item--logos--link" target='_blank' rel='noopener noreferrer' :aria-label="`Partner logo ${idx + 1}`">
              <img
                class='amarothon12--home--partner-box--item--logos--link--icon'
                :src='logo.src'
                :alt="`${item.title} partner logo`"
              />
              <img
                :class="['amarothon12--home--partner-box--item--logos--link--icon__mobile', 'icon__mobile_'+index+'_'+idx]"
                :src='logo.mobileSrc'
                :alt="`${item.title} partner logo mobile`"
              />
            </a>
          </div>
        </div>
      </section>
    </section>
    <section v-if='activeTab === 1' class='amarothon12--agenda' role="tabpanel" :id="`panel-1`" :aria-labelledby="`tab-1`">
      <div class='amarothon12--agenda--bg' aria-hidden="true"></div>
      <div class='amarothon12--agenda--box'>
        <!-- <div class='amarothon12--agenda--box--wait'></div> -->
        <h1 class='amarothon12--agenda--box--title'>演讲议程</h1>
        <p class='amarothon12--agenda--box--subtitle'>Agenda</p>
        <div class="amarothon12--agenda--box-cards" role="list">
          <article v-for="(item, index) in agendas" :key="index" class="amarothon12--agenda--box-cards-item" role="listitem">
            <div class="amarothon12--agenda--box-cards-item-badge" role="status" :aria-label="`Session level: ${item.sessionLevel}`">{{ item.sessionLevel }}</div>
            <div class="amarothon12--agenda--box-cards-item-box">
              <div class="amarothon12--agenda--box-cards-item-box-time">
                <div class="amarothon12--agenda--box-cards-item-box-time-item">
                  <span class="amarothon12--agenda--box-cards-item-box-time-item-timezone">UTC</span>
                  <span class="amarothon12--agenda--box-cards-item-box-time-item-value">{{ item.sessionTimeUTC }}</span>
                </div>
                <div class="amarothon12--agenda--box-cards-item-box-time-item">
                  <span class="amarothon12--agenda--box-cards-item-box-time-item-timezone">Beijing</span>
                  <span class="amarothon12--agenda--box-cards-item-box-time-item-value">{{ item.sessionTimeBeijing }}</span>
                </div>
              </div>
              <div class="amarothon12--agenda--box-cards-item-box-content">
                <div class="amarothon12--agenda--box-cards-item-box-content-desc">
                  <div class="amarothon12--agenda--box-cards-item-box-content-desc-box">
                    <h2 class="amarothon12--agenda--box-cards-item-box-content-desc-box-title">{{ item.sessionTitle }}</h2>
                    <div class="amarothon12--agenda--box-cards-item-box-content-desc-box-lang">
                      <span class="amarothon12--agenda--box-cards-item-box-content-desc-box-lang-label">Language</span>
                      <span class="amarothon12--agenda--box-cards-item-box-content-desc-box-lang-value">{{ item.language }}</span>
                    </div>
                    <p class="amarothon12--agenda--box-cards-item-box-content-desc-box-summary">{{ item.sessionSummary }}</p>
                  </div>
                </div>
                <div class="amarothon12--agenda--box-cards-item-box-content-user">
                  <div class="amarothon12--agenda--box-cards-item-box-content-user-info">
                    <img
                      class='amarothon12--agenda--box-cards-item-box-content-user-info-photo'
                      :src='deviceType === "mobile" ? item.mobilePhoto : item.photo'
                      :alt="`${item.firstName} ${item.lastName} photo`"
                    />
                    <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box">
                      <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box-name">{{ item.firstName + ' ' + item.lastName }}</div>
                      <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box-desc">
                        <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box-desc-country">{{ item.country }}</div>
                        <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box-desc-title">{{ item.title }}</div>
                      </div>
                    </div>
                    <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box_mobile">
                      <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box_mobile-desc">
                        <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box_mobile-desc-name">{{ item.firstName + ' ' + item.lastName }}</div>
                        <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box_mobile-desc-country">{{ item.country }}</div>
                      </div>
                      <div class="amarothon12--agenda--box-cards-item-box-content-user-info-box_mobile-title">{{ item.title }}</div>
                    </div>
                  </div>
                  <div class="amarothon12--agenda--box-cards-item-box-content-user-share" role="list" aria-label="Speaker social media links">
                    <a
                      v-if='item.twitter'
                      :href='item.twitter'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} on Twitter/X`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon size_17_15'
                        src='@/assets/images/amarothon12/agenda_x.png'
                        alt="Twitter/X icon"
                      />
                    </a>
                    <a
                      v-if='item.facebook'
                      :href='item.facebook'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} on Facebook`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon'
                        src='@/assets/images/amarothon12/agenda_f.png'
                        alt="Facebook icon"
                      />
                    </a>
                    <a
                      v-if='item.instagram'
                      :href='item.instagram'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} on Instagram`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon'
                        src='@/assets/images/amarothon12/agenda_ins.png'
                        alt="Instagram icon"
                      />
                    </a>
                    <a
                      v-if='item.gitHub'
                      :href='item.gitHub'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} on GitHub`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon'
                        src='@/assets/images/amarothon12/agenda_github.png'
                        alt="GitHub icon"
                      />
                    </a>
                    <a
                      v-if='item.linkedIn'
                      :href='item.linkedIn'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} on LinkedIn`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon'
                        src='@/assets/images/amarothon12/agenda_in.png'
                        alt="LinkedIn icon"
                      />
                    </a>
                    <a
                      v-if='item.other'
                      :href='item.other'
                      target='_blank'
                      rel='noopener noreferrer'
                      :aria-label="`${item.firstName} ${item.lastName} website`"
                      role="listitem"
                    >
                      <img
                        class='amarothon12--agenda--box-cards-item-box-content-user-share--icon'
                        src='@/assets/images/amarothon12/agenda_www.png'
                        alt="Website icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section v-if='activeTab === 3' class='amarothon12--organizing-committee' role="tabpanel" :id="`panel-3`" :aria-labelledby="`tab-3`">
      <div ref="main" class='amarothon12--organizing-committee--main'>
        <div class="amarothon12--organizing-committee--box">
          <nav class='amarothon12--organizing-committee--box--nav' aria-label="Committee sections navigation">
            <div class='amarothon12--organizing-committee--box--nav--box'>
              <button
                v-for='(item, index) in navigation'
                :key='index'
                @click='changeNav(item.id)'
                class='amarothon12--organizing-committee--box--nav--item'
                :class="{ 'amarothon12--organizing-committee--box--nav--item__active': currNavId === item.id }"
                :aria-label="`Navigate to ${item.titleEn}`"
                :aria-current="currNavId === item.id ? 'true' : 'false'"
              >
                <span class="amarothon12--organizing-committee--box--nav--item--title">{{ item.title }}</span>
                <span class="amarothon12--organizing-committee--box--nav--item--subtitle">{{ item.titleEn }}</span>
              </button>
            </div>
          </nav>
          <h1 class='amarothon12--organizing-committee--box--title'>Amarathon组委会</h1>
          <p class='amarothon12--organizing-committee--box--subtitle'>Amarathon Commmittee</p>
          <div class='amarothon12--organizing-committee--main--cards' role="list">
            <article
              class='amarothon12--organizing-committee--main--cards--card'
              v-for='(card, index) in translations.committee'
              :key='index'
              role="listitem"
            >
              <div class='amarothon12--organizing-committee--main--cards--card--main'>
                <img
                  class='amarothon12--organizing-committee--main--cards--card--main--poster'
                  :src='deviceType === "mobile" ? card.mobilePoster : card.poster'
                  :alt="`${card.name} photo`"
                />
                <div class='amarothon12--organizing-committee--main--cards--card--main--info'>
                  <div class='amarothon12--organizing-committee--main--cards--card--main--info--user'>
                    <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--box'>
                      <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--name'>{{ card.name }}</div>
                      <div v-if='card.position' class='amarothon12--organizing-committee--main--cards--card--main--info--user--position'>{{ card.position }}</div>
                      <div v-if='card.positionEn' class='amarothon12--organizing-committee--main--cards--card--main--info--user--position'>{{ card.positionEn }}</div>
                      <div v-if='card.desc' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.desc }}</div>
                      <div v-if='card.descEn' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.descEn }}</div>
                    </div>
                  </div>
                  <div class='amarothon12--organizing-committee--main--cards--card--main--info--committee'>
                    <div class='amarothon12--organizing-committee--main--cards--card--main--info--committee--box'>
                      <div class='amarothon12--organizing-committee--main--cards--card--main--info--committee--desc'>{{ card.job }}</div>
                      <div class='amarothon12--organizing-committee--main--cards--card--main--info--committee--desc'>{{ card.jobEn }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if='card.share.length' class='amarothon12--organizing-committee--main--cards--card--share'>
                <a
                  v-for='icon in card.share'
                  :href='icon.url'
                  target='_blank'
                >
                  <img
                    :class="['amarothon12--organizing-committee--main--cards--card--share--icon', icon.cusClass ? icon.cusClass : '']"
                    :src='icon.src'
                    alt=''
                  />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
      <section ref="judges" class='amarothon12--organizing-committee--judges'>
        <div class="amarothon12--organizing-committee--box">
          <h2 class='amarothon12--organizing-committee--box--title'>Amarathon 评审团</h2>
          <p class='amarothon12--organizing-committee--box--subtitle'>Amarathon Panel of Judges</p>
          <div class='amarothon12--organizing-committee--main--cards' role="list">
            <article
              class='amarothon12--organizing-committee--main--cards--card'
              v-for='(card, index) in translations.judges'
              :key='index'
              role="listitem"
            >
              <div class='amarothon12--organizing-committee--main--cards--card--main'>
                <img
                  class='amarothon12--organizing-committee--main--cards--card--main--poster'
                  :src='deviceType === "mobile" ? card.mobilePoster : card.poster'
                  :alt="`${card.name} photo`"
                />
                <div class='amarothon12--organizing-committee--main--cards--card--main--info'>
                  <div class='amarothon12--organizing-committee--main--cards--card--main--info--user'>
                    <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--box'>
                      <div class="amarothon12--organizing-committee--main--cards--card--main--info--user--position__box">
                        <h3 class='amarothon12--organizing-committee--main--cards--card--main--info--user--name'>{{ card.name }}</h3>
                        <div v-if='card.position' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.position }}</div>
                        <div v-if='card.positionEn' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.positionEn }}</div>
                      </div>
                      <div class="amarothon12--organizing-committee--main--cards--card--main--info--user--job__box">
                        <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.job }}</div>
                        <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.jobEn }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if='card.share.length' class='amarothon12--organizing-committee--main--cards--card--share'>
                <a
                  v-for='icon in card.share'
                  :href='icon.url'
                  target='_blank'
                >
                  <img
                    :class="['amarothon12--organizing-committee--main--cards--card--share--icon', icon.cusClass ? icon.cusClass : '']"
                    :src='icon.src'
                    alt=''
                  />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section ref="adviser" class='amarothon12--organizing-committee--adviser'>
        <div class="amarothon12--organizing-committee--box">
          <h2 class='amarothon12--organizing-committee--box--title'>Amarathon 顾问</h2>
          <p class='amarothon12--organizing-committee--box--subtitle'>Amarathon Adviser</p>
          <div class='amarothon12--organizing-committee--main--cards' role="list">
            <article
              class='amarothon12--organizing-committee--main--cards--card'
              v-for='(card, index) in translations.adviser'
              :key='index'
              role="listitem"
            >
              <div class='amarothon12--organizing-committee--main--cards--card--main'>
                <img
                  class='amarothon12--organizing-committee--main--cards--card--main--poster'
                  :src='deviceType === "mobile" ? card.mobilePoster : card.poster'
                  :alt="`${card.name} photo`"
                />
                <div class='amarothon12--organizing-committee--main--cards--card--main--info'>
                  <div class='amarothon12--organizing-committee--main--cards--card--main--info--user'>
                    <div class='amarothon12--organizing-committee--main--cards--card--main--info--user--box'>
                      <h3 class='amarothon12--organizing-committee--main--cards--card--main--info--user--name'>{{ card.name }}</h3>
                      <p v-if='card.desc' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.desc }}</p>
                      <p v-if='card.descEn' class='amarothon12--organizing-committee--main--cards--card--main--info--user--desc'>{{ card.descEn }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if='card.share.length' class='amarothon12--organizing-committee--main--cards--card--share' role="list" aria-label="Adviser social media links">
                <a
                  v-for='(icon, idx) in card.share'
                  :key='idx'
                  :href='icon.url'
                  target='_blank'
                  rel='noopener noreferrer'
                  :aria-label="`${card.name} social media link ${idx + 1}`"
                  role="listitem"
                >
                  <img
                    :class="['amarothon12--organizing-committee--main--cards--card--share--icon', icon.cusClass ? icon.cusClass : '']"
                    :src='icon.src'
                    alt="Social media icon"
                  />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import deviceType from '@/utils/deviceType';
import dayjs from 'dayjs';
import agendas from '@/data/agenda';

export default {
  data() {
    return {
      status: 0,//0:直播活动未开始，1:直播活动进行中，2:直播活动已结束
      liveUrl: process.env.NODE_ENV === 'https://dc-testapi.awsapp.cn' || process.env.NODE_ENV === 'https://dc-api-gamma.amazoncloud.cn' ?
        'https://dc-test.awsapp.cn/activity/activityDetail/meetup?id=672acc33121e033b43b3133f' :
        'https://dev.amazoncloud.cn/activity/activityDetail/meetup?id=670f71fafd2bed6cdfcb7a60',
      signUpUrl: process.env.NODE_ENV === 'https://dc-testapi.awsapp.cn' || process.env.NODE_ENV === 'https://dc-api-gamma.amazoncloud.cn' ?
        'https://dc-test.awsapp.cn/activity/activitySignUp?id=672acbac121e033b43b3133e&from=amarathon' :
        'https://dev.amazoncloud.cn/activity/activitySignUp?id=670cd00f99168b381411c69a&from=amarathon',
      questionnaireUrl: process.env.NODE_ENV === 'https://dc-testapi.awsapp.cn' || process.env.NODE_ENV === 'https://dc-api-gamma.amazoncloud.cn' ?
        'https://dc-test.awsapp.cn/questionnaire?id=672acd87121e033b43b31340' :
        'https://dev.amazoncloud.cn/questionnaire?id=6708f2d804dffe0cb249a01c',
      deviceType: '',
      translations: {
        committee: [
          {
            poster: require('@/assets/images/amarothon12/lishaoyi.png'),
            mobilePoster: require('@/assets/images/amarothon12/lishaoyi_mobile.png'),
            name: '李少奕 Shaoyi Li',
            position: 'CN-UG Committee Member, Co-founder of Amarathon Geek Talk, Amazon Community Hero, Amazon GCR Advocate Blogger',
            positionEn: '',
            desc: '',
            descEn: '',
            job: '项目计划、技术负责人',
            jobEn: 'Lead for event technical solutions. Responsible for event planning and management. Promote the Amarathon event to the global to boost its international exposure.',
            share: [
              {
                src: require('@/assets/images/amarothon12/xiaohongshu.png'),
                url: 'https://s12d.com/xiaolige'
              },
              {
                src: require('@/assets/images/amarothon12/csdn.png'),
                url: 'https://blog.csdn.net/m0_66628975?spm=1000.2115.3001.5343'
              },
              {
                src: require('@/assets/images/amarothon12/douyin.png'),
                url: 'https://www.douyin.com/user/MS4wLjABAAAAtx-CKisQ1-JnW0-2Kezisl5MuX5v--VWEiDFCeiG06JgVH11GszdFdum2krMNZZH?vid=7395431332580461839'
              },
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/shaoyi-li-096835140/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/xuyebao.png'),
            mobilePoster: require('@/assets/images/amarothon12/xuyebao_mobile.png'),
            name: '许业宝 Yebao Xu',
            position: 'UGL Amazon GCR Advocate Blogger',
            positionEn: 'UGL Shanghai Member, Amazon GCR Advocate Blogger',
            desc: '亚马逊云科技 UGL 成员及技领云博主，承办社区活动，提供技术支持，获多项亚马逊云科技认证，发表技术博客，分享经验，专注云原生，推广云产品服务。',
            descEn: 'An Amazon UGL member and technical blogger, organizing community events and providing technical support. Holds multiple Amazon certifications, publishes technical blogs, shares expertise, and focuses on cloud-native solutions, promoting cloud products and services.',
            job: '讲师招募、活动支持、直播支持',
            jobEn: 'Responsible for speaker recruitment, event and livestream support',
            share: [
              {
                src: require('@/assets/images/amarothon12/csdn.png'),
                url: 'https://xybdiy.blog.csdn.net/'
              },
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/yebao-xu-aa9283201/'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/zhaoanna.png'),
            mobilePoster: require('@/assets/images/amarothon12/zhaoanna_mobile.png'),
            name: '赵安娜 Anna Zhao',
            position: 'UGL 北京成员',
            positionEn: 'UGL Beijing Member',
            desc: '亚马逊云科技UGL成员，主要负责组织策划UG社区的各类活动，包括Community Day、UG Meetup等，活动的执行，品牌形象策划到视觉设计、文案撰写及活动推广等。提升社区的影响力和认知度，吸引更多技术爱好者加入UG社区。',
            descEn: "An Amazon UGL member primarily responsible for organizing and planning various UG community events, including Community Day and UG Meetups. Duties include event execution, brand image planning, visual design, copywriting, and event promotion. Enhances the community's influence and visibility, attracting more tech enthusiasts to join the UG community.",
            job: '项目策划、内容策划、活动宣发、主持人',
            jobEn: 'Project planning, Content planning, Event promotion, Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/anna-zhao-a83690334'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/zhangrundi.png'),
            mobilePoster: require('@/assets/images/amarothon12/zhangrundi_mobile.png'),
            name: '张润迪 Rundi Zhang',
            position: 'UGL 广州成员',
            positionEn: 'UGL Guangzhou Member',
            desc: '作为亚马逊云科技 UGL 成员之一，主要负责策划并执行 Community Day 和 Meetup 等活动，致力于推动技术交流和知识分享，激发社区活力，让参与者体验广州的文化魅力。',
            descEn: 'As an Amazon UGL member, primarily responsible for planning and executing events such as Community Day and Meetups. Committed to promoting technical exchange and knowledge sharing, inspiring community engagement, and allowing participants to experience the cultural charm of Guangzhou.',
            job: '合作伙伴招募、活动礼品策划',
            jobEn: 'Managed partner and sponsor recruitment, and event gift planning',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/rundi-zhang-030060305'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/maping.png'),
            mobilePoster: require('@/assets/images/amarothon12/maping_mb.png'),
            name: '马萍 Ping Ma',
            position: 'UGL 上海成员',
            positionEn: 'UGL Shanghai Member',
            desc: '作为亚马逊云科技 UGL 成员之一，主要负责社区会员管理，策划并执行上海地区的交流分享活动，致力于推动技术交流和知识分享，提升社区的影响力和认知度，吸引更多技术爱好者加入 UG 社区。',
            descEn: "As an Amazon UGL member, primarily responsible for community member management and planning and executing networking and sharing events in the Shanghai area. Committed to promoting technical exchange and knowledge sharing, enhancing the community's influence and visibility, and attracting more tech enthusiasts to join the UG community.",
            job: '创意策划',
            jobEn: 'Creative Strategy',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/%E8%90%8D-%E9%A9%AC-2b8038a5'
              },
            ]
          },
          
          {
            poster: require('@/assets/images/amarothon12/kennychan.png'),
            mobilePoster: require('@/assets/images/amarothon12/kennychan_mb.png'),
            name: 'Kenny Chan',
            position: '',
            positionEn: 'Amazon Community Builder （Machine Learning, Hong Kong）',
            desc: '亚马逊云科技 Community Builder、金融科技、深度学习、宏观交易。负责出海企业、GenAI、金融服务解决方案。在社区中推动了 “Think Big, Start Small, Learn Fast” 的理念，另“前沿资本”合伙人提供创投和宏观资产配置解决方案。曾获得多个创投比赛奖项，包括 Open Data Hackathon 2023 (Public Stream Champion)，Hong Kong/Shanghai Co-operation Open Data Challenge 2024 (Smart Environment Award & Smart Economy Award)等。',
            descEn: 'Amazon Community Builder specializing in FinTech, deep learning, and macro trading. Responsible for overseas enterprise, GenAI, and financial services solutions. Promotes the "Think Big, Start Small, Learn Fast" philosophy within the community and is a partner at "Frontier Capital," providing venture and macro asset allocation solutions. Recipient of multiple venture competition awards, including the Open Data Hackathon 2023 (Public Stream Champion) and the Hong Kong/Shanghai Co-operation Open Data Challenge 2024 (Smart Environment Award & Smart Economy Award), among others.',
            job: '出海宣发',
            jobEn: 'Responsible for global media publications and media PR promotion',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/kenny-chen-a560a8241/'
              },
              {
                src: require('@/assets/images/amarothon12/devto.png'),
                url: 'https://dev.to/kennc',
                cusClass: 'size_22_17'
              },
              {
                src: require('@/assets/images/amarothon12/www.png'),
                url: 'https://kennychen.frontiertechcap.com/',
                cusClass: 'size_23_22'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/lixiaofei.png'),
            mobilePoster: require('@/assets/images/amarothon12/lixiaofei_mb.png'),
            name: '李小飞 XiaoFei Li',
            position: 'UG Ambassador成员，Amazon GCR Advocate Blogger',
            positionEn: 'UG Ambassador Member, Amazon GCR Advocate Blogger',
            desc: '亚马逊云科技 UG Ambassador成员及技领云博主。2023年与2024年亚马逊云科技全认证工程师，并在2024年上海峰会中荣获金夹克奖项。专注于云迁移与AI技术解决方案，积极发表技术博客、分享经验，策划并执行社区活动，提升社区影响力与认知度，吸引更多技术爱好者加入UG社区。',
            descEn: 'An Amazon UG Ambassador and technology blogger specializing in cloud migration and AI solutions, recognized as a 2023 and 2024 Amazon All Certifications Engineer and an award winner at the 2024 Shanghai Summit Golden Jacket. Actively publishes technical blogs and shares insights, contributing to the planning and execution of community events to enhance community influence and awareness, attracting more tech enthusiasts to join the UG community.',
            job: '内容策划、活动支持、活动宣发',
            jobEn: 'Content planning, Event support and promotion',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/xiaofei-li-3a78289a/'
              },
              {
                src: require('@/assets/images/amarothon12/csdn.png'),
                url: 'https://blog.csdn.net/rralucard123'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/jiangnanxi.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/jiangnanxi.png'),
            name: '蒋南希 Nancy Jiang',
            position: 'Amazon Builder Marketing Manager',
            positionEn: '',
            desc: '',
            descEn: '',
            job: '主持人',
            jobEn: 'Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/nancy526/'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/liweibo.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/liweibo.png'),
            name: '李炜波 Weibo LI',
            position: 'Amazon Account Rep (STP) ',
            positionEn: '',
            desc: '',
            descEn: '',
            job: '主持人',
            jobEn: 'Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/weibo-li-295810234/'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/lixiaoyu.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/lixiaoyu.png'),
            name: '李晓彧 Alex Lee',
            position: 'Amazon Account Rep (STP) ',
            positionEn: '',
            desc: '',
            descEn: '',
            job: '主持人',
            jobEn: 'Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/alex-lee-7266b4311/'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/zhaoxueyan.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/zhaoxueyan.png'),
            name: '赵雪妍 Shane Zhao',
            position: 'Amazon BD Rep Intern (STP) ',
            positionEn: '',
            desc: '',
            descEn: '',
            job: '主持人',
            jobEn: 'Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/xueyan-shane-zhao-a251211a4/'
              },
            ]
          },
        ],
        judges: [
          {
            poster: require('@/assets/images/amarathon12/desktop/lizhao.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/lizhao.png'),
            name: '李钊 Li Zhao',
            position: '亚马逊云科技Brand & Developer MKT Leader',
            positionEn: '',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: []
          },
          {
            poster: require('@/assets/images/amarothon12/betty.png'),
            mobilePoster: require('@/assets/images/amarothon12/betty_mb.png'),
            name: '郑予彬 Betty',
            position: 'Senior Developer Advocate 资深开发者布道师',
            positionEn: '',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/betty-zheng-5420357a/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/panjuan.png'),
            mobilePoster: require('@/assets/images/amarothon12/panjuan_mb.png'),
            name: '潘娟 Juan Pan',
            position: 'Amazon Data hero',
            positionEn: '',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/panjuan'
              },
              {
                src: require('@/assets/images/amarothon12/x.png'),
                url: 'https://twitter.com/tristaZero',
                cusClass: 'size_17_15'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/lishaoyi.png'),
            mobilePoster: require('@/assets/images/amarothon12/lishaoyi_mobile.png'),
            name: '李少奕 Shaoyi Li',
            position: 'Amarathon Committee 技术负责人',
            positionEn: 'Technical Solutions and Contents Lead for the Amarathon Committee',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/xiaohongshu.png'),
                url: 'https://s12d.com/xiaolige'
              },
              {
                src: require('@/assets/images/amarothon12/csdn.png'),
                url: 'https://blog.csdn.net/m0_66628975?spm=1000.2115.3001.5343'
              },
              {
                src: require('@/assets/images/amarothon12/douyin.png'),
                url: 'https://www.douyin.com/user/MS4wLjABAAAAtx-CKisQ1-JnW0-2Kezisl5MuX5v--VWEiDFCeiG06JgVH11GszdFdum2krMNZZH?vid=7395431332580461839'
              },
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/shaoyi-li-096835140/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/xuyebao.png'),
            mobilePoster: require('@/assets/images/amarothon12/xuyebao_mobile.png'),
            name: '许业宝 Yebao Xu',
            position: 'Amarathon Committee 讲师招募负责人',
            positionEn: 'Amarathon Committee Responsible for speaker recruitment',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/csdn.png'),
                url: 'https://xybdiy.blog.csdn.net/'
              },
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/yebao-xu-aa9283201/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/huanghaowen.png'),
            mobilePoster: require('@/assets/images/amarothon12/huanghaowen_mb.png'),
            name: '黄浩文 Haowen Huang',
            position: 'Senior Developer Advocate 资深开发者布道师',
            positionEn: 'Amazon Senior Developer Advocate Senior Developer Evangelist',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/haowenhuang/'
              },
              {
                src: require('@/assets/images/amarothon12/youtube.png'),
                url: 'https://www.youtube.com/@haowenhuang',
                cusClass: 'size_20_14'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/jackychan.png'),
            mobilePoster: require('@/assets/images/amarothon12/jackychan_mb.png'),
            name: '陈豪杰 Jacky Chan',
            position: 'Amazon Community Builder - ML & GenAI 香港成员',
            positionEn: 'Amazon Community Builder - ML & GenAI, Hong Kong',
            job: '内容评审、主持人',
            jobEn: 'Responsible for reviewing speaker proposals, Host',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/jhkchan/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/songhongtao.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/songhongtao.png'),
            name: '宋洪涛 Hongtao Song',
            position: '亚马逊云科技资深人工智能产品市场经理',
            positionEn: 'Senior AI Product Marketing Manager',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/hongtao-song-8233896a/'
              },
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/zhangfan.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/zhangfan.png'),
            name: '张帆 Fan Zhang',
            position: '亚马逊云科技开发者市场经理',
            positionEn: 'Builder Marketing Manager',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: []
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/chenlie.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/chenlie.png'),
            name: '陈烈 Charlie Chen',
            position: '亚马逊云科技资深产品市场经理',
            positionEn: 'Senior Product Marketing Manager',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: []
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/duanhaining.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/duanhaining.png'),
            name: '段海宁 Duan Haining',
            position: '亚马逊云科技开发者市场经理',
            positionEn: 'Builder Marketing Manager',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: []
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/liangjiaqi.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/liangjiaqi.png'),
            name: '梁加琦 Liang Jiaqi',
            position: '亚马逊云科技资深市场经理',
            positionEn: 'Senior Marketing Manager',
            job: '内容评审',
            jobEn: 'Responsible for reviewing speaker proposals',
            share: []
          },
        ],
        adviser: [
          {
            poster: require('@/assets/images/amarothon12/shunyoshie.png'),
            mobilePoster: require('@/assets/images/amarothon12/shunyoshie_mb.png'),
            name: 'Shun Yoshie',
            desc: 'Amazon Security Hero (ex-Amazon Community Hero). Originator of JAWS PANKRATION and executive committee chair of JAWS PANKRATION 2021 and 2024. In Japan, in addition to managing Security-JAWS, he has also managed several Amazon community events.',
            descEn: 'Currently working as an IT security consultant. My favorite Amazon service is Amazon Security Hub & Amazon WAF. My favorite technology is CNAPP.',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/shun-yoshie-6aba9970/'
              },
              {
                src: require('@/assets/images/amarothon12/x.png'),
                url: 'https://x.com/typhon666_death',
                cusClass: 'size_17_15'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarathon12/desktop/smile.png'),
            mobilePoster: require('@/assets/images/amarathon12/mobile/smile.png'),
            name: '吕凌曦 Smile',
            desc: 'Amazon 开发者体验（DevEx）团队社区项目经理，负责大中华区 Hero 社区项目和 Community Builder 社区项目，致力于构建全球中文开发者社区。',
            descEn: 'Amazon Developer Experience advocacy Program Manager，supporting Hero Program, Community Program in Greater China region and global Chinese developer community.',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/smile-lingxi-lv-239b6335'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/liuyanglin.png'),
            mobilePoster: require('@/assets/images/amarothon12/liuyanglin_mb.png'),
            name: '刘洋琳',
            desc: 'Amazon Community Manager（Builder Marketing Manager）亚马逊中国User Group开发者社区负责人，也是亚麻拉松（Amarathon）发起人和创始人之一。',
            descEn: 'Amazon Builder Marketing Manager，The community manager of the Amazon China User Group, and one of the initiators and founders of the Amarathon',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/yanglin-liu-5aba5299/'
              }
            ]
          },
          {
            poster: require('@/assets/images/amarothon12/tracywang.png'),
            mobilePoster: require('@/assets/images/amarothon12/tracywang_mb.png'),
            name: '王萃 Tracy Wang',
            desc: '亚马逊云科技学术倡导团队学生社区项目经理，负责全球学生社区- Amazon Cloud Clubs 项目设计和运营。',
            descEn: 'Amazon Academic Advocacy Team Student Community Program Manager, responsible for global student community-Amazon Cloud Clubs program design and operation.',
            share: [
              {
                src: require('@/assets/images/amarothon12/in.png'),
                url: 'https://www.linkedin.com/in/tracywangcc/'
              },
              {
                src: require('@/assets/images/amarothon12/xiaohongshu.png'),
                url: 'https://s12d.com/xiaohongshu'
              }
            ]
          },
        ]
      },
      activeTab: 0,
      tabs: [
        { id: 0, title: '主页', titleEn: 'Main Page' },
        { id: 1, title: '演讲议程', titleEn: 'Agenda' },
        { id: 3, title: 'Amarathon组委会', titleEn: 'Amarathon Commmittee' }
      ],
      partners: [
        {
          title: '12 小时直播联盟',
          logos: [
            {
              src: require('@/assets/images/amarothon12/partner_logo_infoq.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_infoq_mb.png'),
              link: 'https://www.infoq.cn/'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_segmentfault.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_segmentfault_mb.png'),
              link: 'https://segmentfault.com/'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_itpub.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_itpub_mb.png'),
              link: 'https://www.itpub.net'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_gitcode.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_gitcode_mb.png'),
              link: 'https://gitcode.com/'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_msup.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_msup_mb.png'),
              link: 'https://msup.com.cn/'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_rte.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_rte_mb.png'),
              link: 'https://www.rtecommunity.dev'
            }
          ]
        },
        {
          title: '铂金赞助',
          logos: [
            {
              src: require('@/assets/images/amarothon12/partner_logo_simba.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_simba_mb.png'),
              link: 'https://channels.weixin.qq.com/platform/live/liveReplayHistory'
            }
          ]
        },
        {
          title: '社区合作',
          logos: [
            {
              src: require('@/assets/images/amarothon12/partner_logo_oschina.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_oschina_mb.png'),
              link: 'https://www.oschina.net/'
            },
            {
              src: require('@/assets/images/amarothon12/partner_logo_csdn.png'),
              mobileSrc: require('@/assets/images/amarothon12/partner_logo_csdn_mb.png'),
              link: 'https://www.csdn.net'
            }
          ]
        }
      ],
      navigation: [
        {
          id: 'main',
          title: 'Amarathon组委会',
          titleEn: 'Amarathon Commmittee',
        },
        {
          id: 'judges',
          title: 'Amarathon 评审团',
          titleEn: 'Amarathon Panel of Judges',
        },
        {
          id: 'adviser',
          title: 'Amarathon 顾问',
          titleEn: 'Amarathon Adviser',
        },
      ],
      currNavId: 'main',
    };
  },
  computed: {
    agendas() {
      return agendas.flatMap((item) => {
        return { ...item, photo: require("@/assets/images/amarothon12/photo/"+item.id+".png"), mobilePhoto: require("@/assets/images/amarothon12/photo_mb/"+item.id+".png"), }
      })
    }
  },
  methods: {
    changeTab(id) {
      this.activeTab = id;
      if (this.activeTab === 3) {
        this.currNavId = 'main'
      }
    },
    handleResize() {
      this.deviceType = deviceType();
    },
    addResizeListener() {
      addEventListener('resize', this.handleResize);
    },
    removeResizeListener() {
      removeEventListener('resize', this.handleResize);
    },
    changeNav(nav) {
      let offsetTop = this.$refs[nav].offsetTop;

      if (this.deviceType === 'pc') {
        offsetTop -= 124;
      }

      if (this.deviceType === 'pad') {
        offsetTop -= 70;
      }

      if (this.deviceType === 'mobile') {
        offsetTop -= 70;
      }

      this.currNavId = nav;

      window.scrollTo({
        top: offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    },
  },
  mounted() {
    console.log('agendas', this.agendas);
    
    this.handleResize();
    this.addResizeListener();

    if (dayjs().isBefore("2024-11-23 12:00:00")) {
      this.status = 0;
    } else if (dayjs().isBefore("2024-11-24 00:00:00")) {
      this.status = 1;
    } else {
      this.status = 2;
    }
  },
  beforeDestroy() {
    this.removeResizeListener();
  }
};
</script>

<style scoped lang='scss'>
$pc-width: 1920;
$pad-width: 1024;
$mobile-width: 750;

$pad--max-width: 1199px;
$mobile--max-width: 767px;

@function px2vw($px, $width) {
  @return $px / $width * 100vw;
}

@function pc-px2vw($px) {
  @return px2vw($px, $pc-width);
}

@function pad-px2vw($px) {
  @return px2vw($px, $pad-width);
}

@function mobile-px2vw($px) {
  @return px2vw($px, $mobile-width);
}

* {
  flex-shrink: 0;
  transition: all .25s ease;
}

/* Focus styles for keyboard navigation */
a:focus {
  outline: 2px solid #2d62ff;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
}

a:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

a:focus-visible {
  outline: 2px solid #2d62ff;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
}

.amarothon12 {
  &--poster {
    height: pc-px2vw(300);
    background-image: url('@/assets/images/amarothon12/poster.png');
    background-size: cover;
  }

  &--tabs-box {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    border-bottom: 1px solid #eaecf4;

    &--tabs {
      display: flex;
      width: 1200px;
      margin-bottom: -1px;

      &--tab {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: 7px 0 8px 0;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        border-image: linear-gradient(98deg, transparent -24.99%, transparent 107.17%) 0 0 1 0;
        background: none;
        border-top: none;
        border-left: none;
        border-right: none;
        font-family: inherit;
        outline: none;

        &--title {
          color: #545e6b;
          font-size: 14px;
          line-height: 22px;
        }
        &--subtitle {
          color: #545e6b;
          font-size: 12px;
          line-height: 18px;
        }
        &__active {
          border-image: linear-gradient(98deg, #2d62ff -24.99%, #be52ff 107.17%) 0 0 1 0;
          .amarothon12--tabs-box--tabs--tab--title {
            color: #232f3f;
            font-weight: 700;
          }
        }
        
        &:focus {
          outline: 2px solid #2d62ff;
          outline-offset: -2px;
          box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
        }
        
        &:focus:not(:focus-visible) {
          outline: none;
          box-shadow: none;
        }
        
        &:focus-visible {
          outline: 2px solid #2d62ff;
          outline-offset: -2px;
          box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
        }
      }
    }
  }

  &--home {
    &--desc-box {
      display: flex;
      justify-content: center;
      padding: 72px 0;
      background-color: #ffffff;

      &--desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1200px;

        &--text {
          width: 1200px;
          height: 300px;
          background-image: url('@/assets/images/amarothon12/home_desc.png');
          background-size: 100% 100%;
        }

        &--btns {
          margin-top: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          &--btn {
            margin-left: 16px;
            height: 46px;
            padding: 10px 40px;
            border-radius: 55px;
            background: linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%), #F90;
            color: #FFF;
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px; /* 171.429% */
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              opacity: 0.9;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(45, 98, 255, 0.3);
            }
            &.btn_disabled {
              background: #bec4da;
              cursor: not-allowed;
              &:hover {
                opacity: 1;
                transform: none;
                box-shadow: none;
              }
            }
          }
        }
        &--href{
          color: #3A40FF;
          text-align: center;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px; /* 145.455% */
          // letter-spacing: 1px;
          font-family: "Amazon Ember Display";
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-skip-ink: none;
          text-decoration-thickness: auto;
          text-underline-offset: auto;
          margin-top: 20px;
          a{
            color: #3A40FF;
            cursor: pointer;
            &:hover {
              color: #2D62FF;
              text-decoration-thickness: 2px;
            }
          }
        }
      }
    }

    &--schedule-box {
      display: flex;
      justify-content: center;
      padding: 72px 0;
      background-image: linear-gradient(
          205deg,
          rgba(247, 248, 251, 0.20) 60.71%,
          rgba(166, 169, 255, 0.20) 102.56%
      ),
      linear-gradient(
          6deg,
          rgba(255, 255, 255, 0.00) 55.47%,
          rgba(136, 189, 255, 0.20) 99.96%
      );
      &--desc {
        display: flex;
        align-items: center;
        width: 1200px;
        height: 801px;
        background-image: url('@/assets/images/amarothon12/home_schedule.png');
        background-size: 100% 100%;
        position: relative;
        &--link {
          position: absolute;
          height: 24px;
          width: 640px;
          left: 108px;
          bottom: 268px;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
        &--link2 {
          position: absolute;
          height: 24px;
          width: 120px;
          right: 40px;
          bottom: 210px;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }

    &--speaker-box {
      display: flex;
      justify-content: center;
      padding: 72px 0;
      background-color: #ffffff;

      &--speaker {
        width: 1200px;
        height: 338px;
        display: flex;
        justify-content: center;
        padding: 72px 0;
        background-image: url('@/assets/images/amarothon12/home_speaker.png');
        background-size: 100% 100%;

        &--button {
          width: 221px;
          height: 46px;
          cursor: pointer;
          border-radius: 55px;
          // background-image: url('@/assets/images/amarothon12/home_speaker_button.png');
          background-size: 100% 100%;

          &__disabled {
            width: 150px;
            height: 46px;
            cursor: not-allowed;
            // background-image: url('@/assets/images/amarothon12/home_speaker_button_disabled.png');
          }
        }
      }
    }

    &--partner-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 72px 0;
      background-color: #ffffff;
      background: linear-gradient(6deg, rgba(255, 255, 255, 0.00) 55.47%, rgba(136, 189, 255, 0.20) 99.96%), #FFF;
      &--item {
        margin-top: 60px;
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:first-child {
          margin-top: 0;
        }
        &--title {
          color: #232F3F;
          text-align: center;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 40px; /* 133.333% */
        }
        &--logos {
          margin-top: 24px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &--link {
            margin-left: 60px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              opacity: 0.8;
              transform: scale(1.05);
            }
            &--icon__mobile {
              display: none;
            }
          }
        }
      }
    }
  }

  &--agenda {
    padding: 72px 0 60px;
    position: relative;
    &--bg {
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(6deg, rgba(255, 255, 255, 0.00) 55.47%, rgba(136, 189, 255, 0.20) 99.96%), #FAFAFA;
      width: 100%;
      height: 1370px;
      z-index: 0;
    }
    &--box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #FAFAFA;

      &--wait {
        width: 449px;
        height: 308px;
        // background-image: url('@/assets/images/amarothon12/wait.png');
        background-size: 100% 100%;
      }
      &--title {
        color: #232f3f;
        font-size: 30px;
        font-weight: 700;
        line-height: 32px;
        z-index: 1;
      }
      &--subtitle {
        color: #556E8F;
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
        z-index: 1;
      }
      &-cards {
        margin-top: 36px;
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--aws-spacing-core-unit-5x, 10px);
        &-item {
          padding: 10px;
          border-radius: 12px;
          background: linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%), #FFF;
          position: relative;
          &-badge {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 12px 0px;
            background: linear-gradient(0deg, #585EFF 0%, #585EFF 100%), #D9D9D9;
            display: flex;
            padding: 6px var(--aws-spacing-core-unit-4x, 16px);
            justify-content: center;
            align-items: center;
            gap: 10px;

            color: #FFF;
            font-size: 14px;
            font-weight: 700;
            line-height: 22px; /* 157.143% */
          }
          &-box {
            display: flex;
            width: 1180px;
            padding: 36px 30px 0px 30px;
            justify-content: space-between;
            align-items: flex-start;
            border-radius: var(--Radius-aws-border-radius-core-unit-2x, 8px);
            background: #FFF;
            &-time {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: var(--aws-spacing-core-unit-5x, 10px);
              &-item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                &-timezone {
                  color: #ACB1B7;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 14px; /* 116.667% */
                }
                &-value {
                  color: #8837F3;
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 18px; /* 128.571% */
                  background: linear-gradient(98deg, #2D62FF -24.99%, #8837F3 107.17%), #FFF;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
              }
            }
            &-content {
              display: flex;
              width: 1000px;
              flex-direction: column;
              align-items: flex-start;
              flex-shrink: 0;
              &-desc {
                position: relative;
                overflow: hidden;
                &-box {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  height: 200px;
                  overflow-y: auto;

                  &::-webkit-scrollbar {
                    width: 4px;
                    height: 5px;
                  }
  
                  &::-webkit-scrollbar-thumb {
                    height: 5px;
                    background: #D0DFF0;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }
  
                  &::-webkit-scrollbar-track {
                    height: 5px;
                    background: #ffffff;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }
                  &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 59px;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 6.61%, #ffffff 75%);
                  }
                  &-title {
                    color: #232F3F;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 32px; /* 133.333% */
                  }
                  &-lang {
                    margin-top: 10px;
                    &-label {
                      color: #ACB1B7;
                      font-size: 12px;
                      font-weight: 400;
                      line-height: 16px; /* 133.333% */
                    }
                    &-value {
                      margin-left: 10px;
                      color: #8837F3;
                      font-size: 14px;
                      font-weight: 700;
                      line-height: 22px; /* 157.143% */
                      background: linear-gradient(98deg, #2D62FF -24.99%, #8837F3 107.17%), #FFF;
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                  }
                  &-summary {
                    margin-top: 16px;
                    color: #545E6B;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px; /* 157.143% */
                    margin-bottom: 32px;
                    white-space: pre-line;
                  }
                }
              }
              &-user {
                display: flex;
                padding: var(--aws-spacing-core-unit-6x, 24px) 0px;
                align-items: flex-end;
                justify-content: space-between;
                gap: var(--aws-spacing-core-unit-4x, 16px);
                align-self: stretch;
                border-top: 1px solid #E3E8EF;
                &-info {
                  display: flex;
                  align-items: center;
                  &-photo {
                    width: 46px;
                    height: auto
                  }
                  &-box {
                    margin-left: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    &-name {
                      color: #232F3F;
                      font-size: 18px;
                      font-weight: 700;
                      line-height: 24px; /* 133.333% */
                    }
                    &-desc {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      gap: var(--aws-spacing-core-unit-4x, 22px);
                      &-country {
                        color: #555EFF;
                        font-size: 14px;
                        font-weight: 700;
                        line-height: 22px; /* 157.143% */
                      }
                      &-title {
                        color: #545E6B;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 22px; /* 157.143% */
                        position: relative;
                        &::before {
                          position: absolute;
                          content: "";
                          top: 5px;
                          left: -11px;
                          width: var(--aws-spacing-core-unit-3x, 1px);
                          height: 12px;
                          background: rgba(0, 0, 0, 0.20);
                        }
                      }
                    }
                  }
                  &-box_mobile {
                    display: none;
                  }
                }
                &-share {
                  display: flex;
                  padding: 4px 0px;
                  justify-content: center;
                  align-items: center;
                  gap: var(--aws-spacing-core-unit-4x, 16px);
                  a {
                    cursor: pointer;
                    &:hover {
                      opacity: 0.7;
                      transform: scale(1.1);
                    }
                    .amarothon12--agenda--box-cards-item-box-content-user-share--icon {
                      height: 18px;
                      width: auto;
                      &.size_17_15 {
                        height: 15px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  &--organizing-committee {
    display: flex;
    flex-direction: column;
    align-items: center;

    &--box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 1200px;
      &--title {
        color: #232f3f;
        font-size: 30px;
        font-weight: 700;
        line-height: 32px;
      }
      &--subtitle {
        color: #556E8F;
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
      }
      &--nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 40px 0 60px;
        background: #FFF;
        border-radius: 32px;
        &--item {
          flex: 1;
          padding: 14px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          outline: none;
          &:hover {
            background: rgba(45, 98, 255, 0.05);
            border-radius: 32px;
          }
          &--title {
            color: #232F3F;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
          }
          &--subtitle {
            color: #556E8F;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
          }
          
          &:focus {
            outline: 2px solid #2d62ff;
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
            border-radius: 32px;
          }
          
          &:focus:not(:focus-visible) {
            outline: none;
            box-shadow: none;
          }
          
          &:focus-visible {
            outline: 2px solid #2d62ff;
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(45, 98, 255, 0.2);
            border-radius: 32px;
          }
        }
        &--item__active {
          background: linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%), #FFF;
          border-radius: 32px;
          &:hover {
            background: linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%), #FFF;
            opacity: 0.95;
          }

          .amarothon12--organizing-committee--box--nav--item--title {
            color: #FFF;
            font-weight: 700;
          }
          .amarothon12--organizing-committee--box--nav--item--subtitle {
            color: #C8C3FF;
          }
        }
        &--box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
      }
    }

    &--main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 0 60px 0;
      background-image: linear-gradient(
          6deg,
          rgba(255, 255, 255, 0.00) 55.47%,
          rgba(136, 189, 255, 0.20) 99.96%
      ),
      linear-gradient(
          205deg,
          rgba(247, 248, 251, 0.20) 60.71%,
          rgba(166, 169, 255, 0.20) 102.56%
      );

      &--cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 36px;

        &--card {
          display: flex;
          flex-direction: column;
          flex: 0 0 calc(50% - 10px);
          gap: 10px;
          padding: 10px;
          border-radius: 12px;
          background-image: linear-gradient(98deg, #2d62ff -24.99%, #be52ff 107.17%);

          &--main {
            display: flex;
            gap: 10px;
            height: 240px;
            overflow: hidden;

            &--poster {
              width: 180px;
              height: 100%;
              border-radius: 8px;
            }

            &--info {
              display: flex;
              flex-direction: column;
              flex: 1;
              gap: 10px;
              overflow: hidden;

              &--user {
                position: relative;
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 20px 0;
                background-color: #ffffff;
                border-radius: 8px;
                height: 120px;
                &--box {
                  height: 100%;
                  padding: 0 30px;
                  overflow-y: auto;
                  &::-webkit-scrollbar {
                    width: 4px;
                    height: 5px;
                  }
  
                  &::-webkit-scrollbar-thumb {
                    height: 5px;
                    background: #D0DFF0;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }
  
                  &::-webkit-scrollbar-track {
                    height: 5px;
                    background: #ffffff;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }
                }

                &:after {
                  content: '';
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  height: 43px;
                  border-radius: 8px;
                  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 6.61%, #ffffff 75%);
                }

                &--name {
                  color: #232f3f;
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 28px;
                  margin-bottom: 10px;
                }

                &--position {
                  color: #555eff;
                  font-size: 14px;
                  font-weight: 700;
                }

                &--desc {
                  margin-top: 10px;
                  color: #545e6b;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 22px;
                }
              }

              &--committee {
                display: flex;
                flex-direction: column;
                padding: 10px 0 15px;
                background-color: #ffffff;
                border-radius: 8px;
                height: 70px;
                position: relative;
                &--box {
                  height: 100%;
                  padding: 0 30px;
                  overflow-y: auto;
                  &::-webkit-scrollbar {
                    width: 4px;
                    height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                    height: 5px;
                    background: #D0DFF0;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }

                  &::-webkit-scrollbar-track {
                    height: 5px;
                    background: #ffffff;
                    border-radius: 2px;
                    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  }
                }

                &:after {
                  content: '';
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  height: 31px;
                  border-radius: 8px;
                  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 6.61%, #ffffff 75%);
                }

                &--desc {
                  color: #545e6b;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 22px;
                }
              }
            }
          }

          &--share {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 10px 20px;

            >a {
              line-height: 1;
              cursor: pointer;
              &:hover {
                opacity: 0.7;
                transform: scale(1.1);
              }
            }

            &--icon {
              width: auto;
              height: 18px;
              &.size_22_17 {
                height: 17px;
              }
              &.size_23_22 {
                height: 20px;
              }
              &.size_17_15 {
                height: 15px;
              }
              &.size_20_14 {
                height: 14px;
              }
            }
          }
        }
      }
    }

    &--judges {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 60px 0;
      background: #FFF;
      .amarothon12--organizing-committee--main--cards--card--main--info--user {
        &--box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        &::after {
          display: none;
        }
        &--position__box {
          .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
            margin-top: 0;
            color: #232f3f;
          }
        }
        &--job__box {
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 1px;
            width: 100%;
            background: #E3E8EF;
          }
          .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
            margin-top: 0;
            color: #232f3f;
          }
        }
      }
    }

    &--adviser {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 60px 0;
      background-image: linear-gradient(
          6deg,
          rgba(255, 255, 255, 0.00) 55.47%,
          rgba(136, 189, 255, 0.20) 99.96%
      ),
      linear-gradient(
          205deg,
          rgba(247, 248, 251, 0.20) 60.71%,
          rgba(166, 169, 255, 0.20) 102.56%
      );
      .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
        color: #232f3f;
      }
    }
  }
}

// pad
@media screen and (max-width: $pad--max-width) {
  .amarothon12 {
    &--poster {
      height: pad-px2vw(500);
      background-image: url('@/assets/images/amarothon12/poster_pad.png');
      background-size: cover;
    }

    &--tabs-box {
      &--tabs {
        width: 100%;

        &--tab {
          padding: pad-px2vw(7) 0 pad-px2vw(8) 0;
          &--title {
            font-size: pad-px2vw(14);
            line-height: pad-px2vw(22);
          }
          &--subtitle {
            font-size: pad-px2vw(12);
            line-height: pad-px2vw(18);
          }
        }
      }
    }

    &--home {
      &--desc-box {
        padding: pad-px2vw(72) 0;

        &--desc {
          width: 100%;

          &--text {
            width: pad-px2vw(946);
            height: pad-px2vw(346);
            background-image: url('@/assets/images/amarothon12/home_desc_pad.png');
          }
          &--btns {
            margin-top: pad-px2vw(46);
            &--btn {
              margin-left: pad-px2vw(16);
              height: pad-px2vw(46);
              padding: pad-px2vw(10) pad-px2vw(40);
              border-radius: pad-px2vw(55);
              font-size: pad-px2vw(14);
              line-height: pad-px2vw(24); /* 171.429% */
              &:first-child {
                margin-left: 0;
              }
            }
          }
        }
      }

      &--schedule-box {
        padding: pad-px2vw(72) 0;
        &--desc {
          width: pad-px2vw(946);
          height: pad-px2vw(811);
          background-image: url('@/assets/images/amarothon12/home_schedule_pad.png');
          background-size: 100% 100%;
          &--link {
            height: pad-px2vw(24);
            width: pad-px2vw(640);
            left: pad-px2vw(110);
            bottom: pad-px2vw(278)
          }
          &--link2 {
            position: absolute;
            height: pad-px2vw(24);
            width: pad-px2vw(120);
            right: pad-px2vw(40);
            bottom: pad-px2vw(220);
          }
        }
      }

      &--speaker-box {
        padding: pad-px2vw(72) 0;

        &--speaker {
          width: pad-px2vw(946);
          height: pad-px2vw(381);
          background-image: url('@/assets/images/amarothon12/home_speaker_pad.png');
          background-size: 100% 100%;
        }
      }

      &--partner-box {
        padding: pad-px2vw(72) 0;
        &--item {
          margin-top: pad-px2vw(60);
          width: pad-px2vw(946);
          &:first-child {
            margin-top: 0;
          }
          &--title {
            font-size: pad-px2vw(30);
            line-height: pad-px2vw(40); /* 133.333% */
          }
          &--logos {
            margin-top: pad-px2vw(24);
            flex-wrap: wrap;
            &--link {
              margin-left: pad-px2vw(60);
              &:first-child {
                margin-left: 0;
              }
              &:nth-child(6) {
                margin-left: 0;
                margin-top: pad-px2vw(20);
              }
              &--icon {
              }
            }
          }
        }
      }
    }

    &--agenda {
      padding: pad-px2vw(72) 0 pad-px2vw(60);
      &--bg {
        height: pad-px2vw(1566);
      }
      &--box {

        &--wait {
          width: pad-px2vw(449);
          height: pad-px2vw(452);
          // background-image: url('@/assets/images/amarothon12/wait_pad.png');
        }
        &--title {
          font-size: pad-px2vw(30);
          line-height: pad-px2vw(32);
        }
        &--subtitle {
          font-size: pad-px2vw(20);
          line-height: pad-px2vw(32);
        }
        &-cards {
          margin-top: pad-px2vw(36);
          width: pad-px2vw(946);
          gap: var(--aws-spacing-core-unit-5x, pad-px2vw(10));
          &-item {
            border-radius: pad-px2vw(12);
            &-badge {
              border-radius: pad-px2vw(12) 0;
              padding: pad-px2vw(6) var(--aws-spacing-core-unit-4x, pad-px2vw(16));
              gap: pad-px2vw(10);
              font-size: pad-px2vw(14);
              line-height: pad-px2vw(22); /* 157.143% */
            }
            &-box {
              width: pad-px2vw(926);
              padding: pad-px2vw(36) pad-px2vw(30) 0;
              border-radius: var(--Radius-aws-border-radius-core-unit-2x, pad-px2vw(8));
              &-time {
                gap: var(--aws-spacing-core-unit-5x, pad-px2vw(10));
                &-item {
                  &-timezone {
                    font-size: pad-px2vw(12);
                    line-height: pad-px2vw(14); /* 116.667% */
                  }
                  &-value {
                    font-size: pad-px2vw(14);
                    line-height: pad-px2vw(18); /* 128.571% */
                  }
                }
              }
              &-content {
                width: pad-px2vw(769);
                &-desc {
                  &-box {
                    height: pad-px2vw(200);

                    &:after {
                      height: pad-px2vw(59);
                    }
                    &-title {
                      font-size: pad-px2vw(24);
                      line-height: pad-px2vw(32); /* 133.333% */
                    }
                    &-lang {
                      margin-top: pad-px2vw(10);
                      &-label {
                        font-size: pad-px2vw(12);
                        line-height: pad-px2vw(16); /* 133.333% */
                      }
                      &-value {
                        margin-left: pad-px2vw(10);
                        font-size: pad-px2vw(14);
                        line-height: pad-px2vw(22); /* 157.143% */
                      }
                    }
                    &-summary {
                      margin-top: pad-px2vw(16);
                      font-size: pad-px2vw(14);
                      line-height: pad-px2vw(22); /* 157.143% */
                      margin-bottom: pad-px2vw(32);
                    }
                  }
                }
                &-user {
                  padding: var(--aws-spacing-core-unit-6x, pad-px2vw(24)) 0;
                  gap: var(--aws-spacing-core-unit-4x, pad-px2vw(16));
                  &-info {
                    &-photo {
                      width: pad-px2vw(46);
                    }
                    &-box {
                      margin-left: pad-px2vw(16);
                      &-name {
                        font-size: pad-px2vw(18);
                        line-height: pad-px2vw(24); /* 133.333% */
                      }
                      &-desc {
                        gap: var(--aws-spacing-core-unit-4x, pad-px2vw(22));
                        &-country {
                          font-size: pad-px2vw(14);
                          line-height: pad-px2vw(22); /* 157.143% */
                        }
                        &-title {
                          font-size: pad-px2vw(14);
                          line-height: pad-px2vw(22); /* 157.143% */
                          &::before {
                            top: pad-px2vw(5);
                            left: -pad-px2vw(11);
                            height: pad-px2vw(12);
                          }
                        }
                      }
                    }
                  }
                  &-share {
                    padding: pad-px2vw(4) 0;
                    gap: var(--aws-spacing-core-unit-4x, pad-px2vw(16));
                    a {
                      .amarothon12--agenda--box-cards-item-box-content-user-share--icon {
                        height: pad-px2vw(18);
                        &.size_17_15 {
                          height: pad-px2vw(15);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    &--organizing-committee {
      &--box {
        width: 100%;
        &--title {
          font-size: pad-px2vw(30);
          line-height: pad-px2vw(32);
        }
        &--subtitle {
          font-size: pad-px2vw(20);
          line-height: pad-px2vw(32);
        }
        &--nav {
          width: pad-px2vw(946);
          margin: pad-px2vw(40) 0 pad-px2vw(60);
          border-radius: pad-px2vw(32);
          &--item {
            padding: pad-px2vw(14) pad-px2vw(80);
            &--title {
              font-size: pad-px2vw(14);
              line-height: pad-px2vw(16);
            }
            &--subtitle {
              font-size: pad-px2vw(12);
              line-height: pad-px2vw(18);
            }
          }
          &--item__active {
            border-radius: pad-px2vw(32);
          }
        }
      }

      &--main {
        width: 100%;
        padding: 0 0 pad-px2vw(60) 0;
        &--cards {
          width: 100%;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: pad-px2vw(20);
          margin-top: pad-px2vw(36);
          padding: 0 pad-px2vw(39);

          &--card {
            flex: 1;
            gap: pad-px2vw(10);
            padding: pad-px2vw(10);
            border-radius: pad-px2vw(12);

            &--main {
              gap: pad-px2vw(10);
              height: pad-px2vw(240);

              &--poster {
                width: pad-px2vw(180);
                border-radius: pad-px2vw(8);
              }

              &--info {
                gap: pad-px2vw(10);

                &--user {
                  padding: pad-px2vw(20) 0;
                  border-radius: pad-px2vw(8);
                  height: pad-px2vw(120);
                  &--box {
                    padding: 0 pad-px2vw(30);
                  }

                  &:after {
                    height: pad-px2vw(43);
                    border-radius: pad-px2vw(8);
                  }

                  &--name {
                    font-size: pad-px2vw(20);
                    line-height: pad-px2vw(28);
                    margin-bottom: pad-px2vw(10);
                  }

                  &--position {
                    font-size: pad-px2vw(14);
                  }

                  &--desc {
                    margin-top: pad-px2vw(10);
                    font-size: pad-px2vw(14);
                    line-height: pad-px2vw(22);
                  }
                }

                &--committee {
                  padding: pad-px2vw(10) 0 pad-px2vw(15);
                  border-radius: pad-px2vw(8);
                  height: pad-px2vw(70);
                  &--box {
                    padding: 0 pad-px2vw(30);
                    overflow-y: auto;
                  }

                  &:after {
                    height: pad-px2vw(31);
                    border-radius: pad-px2vw(8);
                  }

                  &--desc {
                    font-size: pad-px2vw(14);
                    line-height: pad-px2vw(22);
                  }
                }
              }
            }

            &--share {
              gap: pad-px2vw(16);
              padding: pad-px2vw(10) pad-px2vw(20);

              &--icon {
                height: pad-px2vw(18);
                &.size_22_17 {
                  height: pad-px2vw(17);
                }
                &.size_23_22 {
                  height: pad-px2vw(20);
                }
                &.size_17_15 {
                  height: pad-px2vw(15);
                }
                &.size_20_14 {
                  height: pad-px2vw(14);
                }
              }
            }
          }
        }
      }

      &--judges {
        width: 100%;
        padding: pad-px2vw(60) 0;
        .amarothon12--organizing-committee--main--cards--card--main--info--user {
          &--position__box {
            .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
              margin-top: 0;
            }
          }
          &--job__box {
            height: pad-px2vw(65);
            .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
              margin-top: 0;
            }
          }
        }
      }

      &--adviser {
        width: 100%;
        padding: pad-px2vw(60) 0;
      }
    }
  }
}
// pad
@media screen and (max-width: 957px) {
  .amarothon12--home--partner-box--item--logos--link {
    &:nth-child(5) {
      margin-left: 0;
      margin-right: pad-px2vw(60);
      margin-top: pad-px2vw(20);
    }
    &:nth-child(6) {
      margin-top: pad-px2vw(20);
    }
  }
}

// mobile
@media screen and (max-width: $mobile--max-width) {
  .amarothon12 {
    &--poster {
      height: mobile-px2vw(560);
      background-image: url('@/assets/images/amarothon12/poster_mobile.png');
      background-size: cover;
    }

    &--tabs-box {
      &--tabs {
        width: 100%;

        &--tab {
          padding: mobile-px2vw(22) 0 mobile-px2vw(16) 0;
          &--title {
            font-size: mobile-px2vw(22);
            line-height: mobile-px2vw(22);
          }
          &--subtitle {
            font-size: mobile-px2vw(18);
            line-height: mobile-px2vw(24);
          }
        }
      }
    }

    &--home {
      &--desc-box {
        padding: mobile-px2vw(72) 0;

        &--desc {
          width: 100%;

          &--text {
            width: mobile-px2vw(690);
            height: mobile-px2vw(804);
            background-image: url('@/assets/images/amarothon12/home_desc_mobile.png');
          }

          &--btns {
            margin-top: mobile-px2vw(46);
            flex-direction: column;
            &--btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 0;
              margin-top: mobile-px2vw(16);
              width: mobile-px2vw(690);
              height: mobile-px2vw(94);
              padding: mobile-px2vw(10) mobile-px2vw(80);
              border-radius: mobile-px2vw(55);
              font-size: mobile-px2vw(22);
              line-height: mobile-px2vw(32); /* 171.429% */
              &:first-child {
                margin-top: 0;
                padding: mobile-px2vw(10) mobile-px2vw(155);
              }
            }
          }
          &--href{
            font-size: mobile-px2vw(22);
            line-height: mobile-px2vw(32);
            margin-top: mobile-px2vw(40);
          }
        }
      }

      &--schedule-box {
        padding: mobile-px2vw(72) 0;
        &--desc {
          width: mobile-px2vw(672);
          height: mobile-px2vw(1483);
          background-image: url('@/assets/images/amarothon12/home_schedule_mb.png');
          background-size: 100% 100%;
          &--link {
            height: mobile-px2vw(86);
            width: mobile-px2vw(520);
            left: mobile-px2vw(80);
            bottom: mobile-px2vw(438)
          }
          &--link2 {
            position: absolute;
            height: mobile-px2vw(32);
            width: mobile-px2vw(200);
            left: mobile-px2vw(80);
            bottom: mobile-px2vw(360);
          }
        }
      }

      &--speaker-box {
        padding: mobile-px2vw(72) 0;

        &--speaker {
          width: mobile-px2vw(690);
          height: mobile-px2vw(610);
          background-image: url('@/assets/images/amarothon12/home_speaker_mobile.png');
          background-size: 100% 100%;

        }
      }

      &--partner-box {
        padding: mobile-px2vw(72) 0;
        &--item {
          margin-top: mobile-px2vw(60);
          width: mobile-px2vw(690);
          &:first-child {
            margin-top: 0;
          }
          &--title {
            font-size: mobile-px2vw(38);
            line-height: mobile-px2vw(48); /* 133.333% */
          }
          &--logos {
            margin-top: mobile-px2vw(36);
            flex-wrap: wrap;
            &--link {
              margin-left: mobile-px2vw(60);
              &:first-child {
                margin-left: 0;
              }
              &:nth-child(4) {
                margin-left: 0;
                margin-top: mobile-px2vw(20);
              }
              &:nth-child(5), &:nth-child(6) {
                margin-left: mobile-px2vw(60);
                margin-top: mobile-px2vw(20);
              }
              &--icon {
                display: none;
                &__mobile {
                  display: block;
                }
              }
              .icon__mobile_0_0 {
                width: mobile-px2vw(137);
              }
              .icon__mobile_0_1 {
                width: mobile-px2vw(280);
              }
              .icon__mobile_0_2 {
                width: mobile-px2vw(128);
              }
              .icon__mobile_0_3 {
                width: mobile-px2vw(190);
              }
              .icon__mobile_0_4 {
                width: mobile-px2vw(167);
              }
              .icon__mobile_0_5 {
                width: mobile-px2vw(113);
              }
              .icon__mobile_1_0 {
                width: mobile-px2vw(226);
              }
              .icon__mobile_2_0 {
                width: mobile-px2vw(237);
              }
              .icon__mobile_2_1 {
                width: mobile-px2vw(207);
              }
            }
          }
        }
      }
    }

    &--agenda {
      padding: mobile-px2vw(72) 0 mobile-px2vw(60);
      &--bg {
        height: mobile-px2vw(3144);
      }
      &--box {

        &--wait {
          width: mobile-px2vw(449);
          height: mobile-px2vw(496);
          // background-image: url('@/assets/images/amarothon12/wait_mobile.png');
        }
        &--title {
          font-size: mobile-px2vw(38);
          line-height: mobile-px2vw(48);
        }
        &--subtitle {
          font-size: mobile-px2vw(28);
          line-height: mobile-px2vw(40);
        }
        &-cards {
          margin-top: mobile-px2vw(36);
          width: mobile-px2vw(672);
          gap: var(--aws-spacing-core-unit-5x, mobile-px2vw(20));
          &-item {
            padding: mobile-px2vw(10);
            border-radius: mobile-px2vw(24);
            &-badge {
              left: unset;
              right: 0;
              padding: var(--aws-spacing-core-unit-3x, mobile-px2vw(12)) mobile-px2vw(30);
              border-radius: 0 mobile-px2vw(24);
              background: linear-gradient(0deg, #8359FF 0%, #8359FF 100%), #D9D9D9;
              gap: mobile-px2vw(10);
              font-size: mobile-px2vw(22);
              line-height: mobile-px2vw(66); /* 157.143% */
            }
            &-box {
              flex-direction: column;
              align-items: flex-start;
              width: mobile-px2vw(652);
              padding: mobile-px2vw(24) mobile-px2vw(30) 0;
              border-radius: var(--Radius-aws-border-radius-core-unit-2x, mobile-px2vw(16));
              &-time {
                flex-direction: row;
                align-items: center;
                gap: var(--aws-spacing-core-unit-5x, mobile-px2vw(58));
                &-item {
                  position: relative;
                  &::before {
                    content: "";
                    position: absolute;
                    left: mobile-px2vw(-29);
                    top: mobile-px2vw(4);
                    width: 1px;
                    height: mobile-px2vw(50);
                    background: rgba(0, 0, 0, 0.20);
                  }
                  &:first-child::before {
                    display: none;
                  }
                  &-timezone {
                    font-size: mobile-px2vw(20);
                    line-height: mobile-px2vw(24); /* 116.667% */
                  }
                  &-value {
                    font-size: mobile-px2vw(24);
                    line-height: mobile-px2vw(28); /* 128.571% */
                  }
                }
              }
              &-content {
                margin-top: mobile-px2vw(32);
                width: mobile-px2vw(592);
                &-desc {
                  &-box {
                    height: mobile-px2vw(350);

                    &:after {
                      height: mobile-px2vw(70);
                    }
                    &-title {
                      font-size: mobile-px2vw(32);
                      line-height: mobile-px2vw(40); /* 133.333% */
                    }
                    &-lang {
                      margin-top: mobile-px2vw(16);
                      &-label {
                        font-size: mobile-px2vw(20);
                        line-height: mobile-px2vw(24); /* 133.333% */
                      }
                      &-value {
                        margin-left: mobile-px2vw(10);
                        font-size: mobile-px2vw(26);
                        line-height: mobile-px2vw(32); /* 157.143% */
                      }
                    }
                    &-summary {
                      margin-top: mobile-px2vw(32);
                      font-size: mobile-px2vw(22);
                      line-height: mobile-px2vw(30); /* 157.143% */
                      margin-bottom: mobile-px2vw(32);
                    }
                  }
                }
                &-user {
                  flex-direction: column;
                  align-items: flex-start;
                  padding: var(--aws-spacing-core-unit-6x, mobile-px2vw(40)) 0;
                  gap: var(--aws-spacing-core-unit-4x, mobile-px2vw(16));
                  &-info {
                    &-photo {
                      width: mobile-px2vw(90);
                    }
                    &-box {
                      display: none;
                    }
                    &-box_mobile {
                      display: block;
                      margin-left: mobile-px2vw(30);
                      &-desc {
                        display: flex;
                        align-items: center;
                        &-name {
                          color: #232F3F;
                          font-weight: 700;
                          font-size: mobile-px2vw(26);
                          line-height: mobile-px2vw(32); /* 133.333% */
                        }
                        &-country {
                          margin-left: mobile-px2vw(16);
                          color: #555EFF;
                          font-weight: 700;
                          font-size: mobile-px2vw(26);
                          line-height: mobile-px2vw(32); /* 157.143% */
                        }
                      }
                      &-title {
                        width: mobile-px2vw(472);
                        text-wrap: wrap;
                        color: #545E6B;
                        font-weight: 400;
                        font-size: mobile-px2vw(22);
                        line-height: mobile-px2vw(32); /* 157.143% */
                      }
                    }
                  }
                  &-share {
                    margin-left: mobile-px2vw(120);
                    padding: 0;
                    gap: var(--aws-spacing-core-unit-4x, mobile-px2vw(16));
                    a {
                      .amarothon12--agenda--box-cards-item-box-content-user-share--icon {
                        height: mobile-px2vw(26);
                        &.size_17_15 {
                          height: mobile-px2vw(26);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    &--organizing-committee {
      &--box {
        width: 100%;
        &--title {
          font-size: mobile-px2vw(30);
          line-height: mobile-px2vw(32);
        }
        &--subtitle {
          font-size: mobile-px2vw(20);
          line-height: mobile-px2vw(32);
        }
        &--nav {
          display: none;
          // margin: mobile-px2vw(40) 0 mobile-px2vw(60);
          // border-radius: 0;
          // overflow-x: auto;
          // width: 100%;
          // &--item {
          //   padding: mobile-px2vw(15) 0;
          //   &--title {
          //     font-size: mobile-px2vw(22);
          //     line-height: mobile-px2vw(24);
          //   }
          //   &--subtitle {
          //     font-size: mobile-px2vw(18);
          //     line-height: mobile-px2vw(24);
          //   }
          // }
          // &--item__active {
          //   border-radius: 0;
          // }

          // &--box {
          //   width: mobile-px2vw(900);
          // }
          // &::-webkit-scrollbar {
          //   height: 0;
          // }
          // &::-webkit-scrollbar-thumb {
          //   height: 0;
          // }
        }
      }

      &--main {
        width: 100%;
        padding: mobile-px2vw(60) 0 mobile-px2vw(60) 0;
        &--cards {
          width: 100%;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: mobile-px2vw(20);
          margin-top: mobile-px2vw(36);
          padding: 0 mobile-px2vw(39);

          &--card {
            flex: 1;
            gap: mobile-px2vw(10);
            padding: mobile-px2vw(10);
            border-radius: mobile-px2vw(24);

            &--main {
              flex-direction: column;
              gap: mobile-px2vw(10);
              height: unset;

              &--poster {
                width: 100%;
                height: mobile-px2vw(380);
                border-radius: mobile-px2vw(16);
              }

              &--info {
                gap: mobile-px2vw(10);

                &--user {
                  padding: mobile-px2vw(20) 0;
                  border-radius: mobile-px2vw(16);
                  height: mobile-px2vw(260);
                  flex: unset;
                  &--box {
                    padding: 0 mobile-px2vw(30);
                  }

                  &:after {
                    height: mobile-px2vw(83);
                    border-radius: mobile-px2vw(16);
                  }

                  &--name {
                    font-size: mobile-px2vw(28);
                    line-height: mobile-px2vw(36);
                    margin-bottom: mobile-px2vw(10);
                  }

                  &--position {
                    font-size: mobile-px2vw(22);
                  }

                  &--desc {
                    margin-top: mobile-px2vw(10);
                    font-size: mobile-px2vw(22);
                    line-height: mobile-px2vw(30);
                  }
                }

                &--committee {
                  padding: mobile-px2vw(20) 0;
                  border-radius: mobile-px2vw(16);
                  height: unset;
                  &--box {
                    padding: 0 mobile-px2vw(30);
                    overflow-y: auto;
                  }

                  &:after {
                    content: none;
                  }

                  &--desc {
                    font-size: mobile-px2vw(22);
                    line-height: mobile-px2vw(30);
                  }
                }
              }
            }

            &--share {
              gap: mobile-px2vw(26);
              padding: mobile-px2vw(20);

              &--icon {
                height: mobile-px2vw(26);
                &.size_22_17 {
                  height: mobile-px2vw(26);
                }
                &.size_23_22 {
                  height: mobile-px2vw(26);
                }
                &.size_17_15 {
                  height: mobile-px2vw(26);
                }
                &.size_20_14 {
                  height: mobile-px2vw(26);
                }
              }
            }
          }
        }
      }

      &--judges {
        width: 100%;
        padding: mobile-px2vw(60) 0;
        .amarothon12--organizing-committee--main--cards--card--main {
          height: unset;
        }
        .amarothon12--organizing-committee--main--cards--card--main--info--user {
          flex: 1;
          height: unset;
          &--position__box {
            .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
              margin-top: 0;
            }
          }
          &--job__box {
            margin-top: mobile-px2vw(30);
            height: mobile-px2vw(91);
            .amarothon12--organizing-committee--main--cards--card--main--info--user--desc {
              margin-top: 0;
            }
          }
        }
      }

      &--adviser {
        width: 100%;
        padding: mobile-px2vw(60) 0;
        .amarothon12--organizing-committee--main--cards--card--main {
          height: unset;
        }
        .amarothon12--organizing-committee--main--cards--card--main--info--user {
          flex: 1;
          height: unset;
          &:after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
