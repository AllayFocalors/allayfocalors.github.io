(function(a,i){typeof exports=="object"&&typeof module<"u"?module.exports=i():typeof define=="function"&&define.amd?define(i):(a=typeof globalThis<"u"?globalThis:a||self,a.SiteLoader=i())})(this,function(){"use strict";class a{constructor(e){this._allResorceData=e,this._allResourceCount=0,this._allDoms={imgsDoms:[],mediaDoms:[]},this._allResourcesTag={},this._isStageLoad=e&&e.length>1,this._stageDoms=[],this._stageResourceCount={},this._stageResourceLoadedCount={},this._addonLoadedRatio=0,this._addonLoadFunc=null,this._targetTextDom=null,this._targetProgress=20,this._loadedCount=0,this._progress=0,this._progressChangeTimer=null,this._events={beforeStart:null,countComplete:null,trueLoadFinish:null,progress:null},this.progressSpeed=20,this.needSpeedUp=!1,this._isStageLoad&&this._allResorceData.forEach(t=>{this._events[t.stageName]=null}),this._errorCheck()}_errorCheck(){if(this._allResorceData&&this._allResorceData.length===0)throw new Error("no resource data | 不能传入空数组，没有资源数据");if(this._allResorceData&&!(this._allResorceData instanceof Array))throw new Error("传入的必须是一个数组 | resource data must be array");if(this._isStageLoad){this._allResorceData.forEach(s=>{var r;if(!s.stageName)throw new Error("没有设置stageName | no stageName");if(((r=s.sources)==null?void 0:r.length)===0||!s.sources)throw new Error("没有设置资源数据 sources data | no sources");if(!(s.sources instanceof Array))throw new Error("资源数据sources必须是数组 | sources must be array");s.sources&&s.sources.forEach(o=>{if(!["image","font","media"].includes(o.sourceType))throw new Error("sourceType is not correct | sourceType 名称不对，只能是image font或者media（视频或者音频）")})});const e=this._allResorceData.map(s=>s.stageName);if(new Set(e).size!==this._allResorceData.length)throw new Error("stageName 重复 | stageName is repeat")}else{if(this._allResorceData&&!this._allResorceData[0].sources)throw new Error("没有设置资源数据 sources data | no sources");if(this._allResorceData&&!(this._allResorceData[0].sources instanceof Array))throw new Error("资源数据sources必须是数组 | sources must be array");this._allResorceData&&this._allResorceData[0].sources.forEach(e=>{if(!["image","font","media"].includes(e.sourceType))throw new Error("sourceType is not correct | sourceType 名称不对，只能是image font或者media（视频或者音频）")})}}setTargetTextDom(e){const t=document.querySelector(e);this._targetTextDom=t}startLoad(){this._events.beforeStart&&this._events.beforeStart(),this._loaderInit(),this._progressDetect(),this._addonLoadFunc&&this._addonLoadFunc()}_errorLoad(e,t){this._loadedCount++,this._trueLoadControl(),console.warn(`加载${e}资源${t}失败`)}_loaderInit(){this._allResorceData?this._allResorceData.forEach(e=>{this._isStageLoad?this._stageResourceInit(e):this._allResourceInit(e)}):this._emptyParamInit(),this._allResorceData&&this._allResorceData.length>1?this._mutileStageStartLoad(this._allResorceData[0].stageName):this._allLoad()}_emptyParamInit(){const e=document.querySelectorAll("img"),t=document.querySelectorAll("video"),s=document.querySelectorAll("audio");console.log(e,t,s),this._allDoms.imgsDoms=Array.from(e),this._allDoms.mediaDoms=Array.from(t).concat(Array.from(s)),this._allResourceCount=this._allDoms.imgsDoms.length+this._allDoms.mediaDoms.length}_allResourceInit(e){e.sources.forEach(t=>{t.sourceType==="image"?t.selectors.forEach(s=>{const r=document.querySelectorAll(s);r.forEach(o=>{this._allResourcesTag[o.currentSrc||o.src]=!1}),this._allDoms.imgsDoms=[...this._allDoms.imgsDoms,...r],this._allResourceCount+=r.length}):t.sourceType==="media"&&t.selectors.forEach(s=>{const r=document.querySelectorAll(s);r.forEach(o=>{this._allResourcesTag[o.src]=!1}),this._allDoms.mediaDoms=[...this._allDoms.mediaDoms,...r],this._allResourceCount+=r.length})})}_stageResourceInit(e){this._stageResourceCount[e.stageName]=0,this._stageResourceLoadedCount[e.stageName]=0,e.sources.forEach(t=>{this._stageDoms[e.stageName]=this._stageDoms[e.stageName]||{},this._stageDoms[e.stageName][t.sourceType]=this._stageDoms[e.stageName][t.sourceType]||[],t.sourceType==="image"?t.selectors.forEach(s=>{const r=document.querySelectorAll(s);r.forEach(o=>{this._allResourcesTag[o.currentSrc||o.src]=!1}),this._stageDoms[e.stageName][t.sourceType]=[...this._stageDoms[e.stageName][t.sourceType],...r],this._allResourceCount+=r.length,this._stageResourceCount[e.stageName]+=r.length}):t.sourceType==="media"&&t.selectors.forEach(s=>{const r=document.querySelectorAll(s);r.forEach(o=>{this._allResourcesTag[o.src]=!1}),this._stageDoms[e.stageName][t.sourceType]=[...this._stageDoms[e.stageName][t.sourceType],...r],this._allResourceCount+=r.length,this._stageResourceCount[e.stageName]+=r.length})})}_allLoad(){this._allDoms.imgsDoms.length>0&&this._loadAllImg(),this._allDoms.mediaDoms.length>0&&this._loadAllMedia()}_loadAllImg(){this._allDoms.imgsDoms.forEach(e=>{e.onload=()=>{this._allResourcesTag[e.currentSrc||e.src]||(this._loadedCount++,this._trueLoadControl(),this._allResourcesTag[e.currentSrc||e.src]=!0)},e.onerror=()=>{this._allResourcesTag[e.currentSrc||e.src]||(this._errorLoad("图片",e.currentSrc||e.src),this._allResourcesTag[e.currentSrc||e.src]=!0)},e.src=e.currentSrc||e.src})}_loadAllMedia(){this._allDoms.mediaDoms.forEach(e=>{e.addEventListener("canplaythrough",()=>{this._allResourcesTag[e.src]||(this._loadedCount++,this._trueLoadControl(),this._allResourcesTag[e.src]=!0)}),e.addEventListener("error",()=>{this._allResourcesTag[e.src]||(this._errorLoad("音频/视频",e.currentSrc||e.src),this._allResourcesTag[e.src]=!0)}),e.src=e.currentSrc||e.src})}_mutileStageStartLoad(e){const t=this._stageDoms[e];for(let s in t)s==="image"?this._loadStageImg(t[s],e):s==="media"&&this._loadStageMedia(t[s],e)}_loadStageImg(e,t){e.forEach(s=>{s.onload=()=>{this._allResourcesTag[s.currentSrc||s.src]||(this._stageResourceLoadedCount[t]++,this._loadedCount++,this._stageLoadCheck(t),this._trueLoadControl(),this._allResourcesTag[s.currentSrc||s.src]=!0)},s.onerror=()=>{this._allResourcesTag[s.currentSrc||s.src]||(this._errorLoad("图片",s.currentSrc||s.src),this._allResourcesTag[s.currentSrc||s.src]=!0)},s.src=s.currentSrc||s.src})}_loadStageMedia(e,t){e.forEach(s=>{s.addEventListener("canplaythrough",()=>{this._allResourcesTag[s.src]||(this._stageResourceLoadedCount[t]++,this._loadedCount++,this._stageLoadCheck(t),this._trueLoadControl(),this._allResourcesTag[s.src]=!0)}),s.addEventListener("error",()=>{this._allResourcesTag[s.src]||(this._errorLoad("音频/视频",s.currentSrc||s.src),this._allResourcesTag[s.src]=!0)}),s.src=s.currentSrc||s.src})}_stageLoadCheck(e){this._stageResourceLoadedCount[e]===this._stageResourceCount[e]&&(this._events[e]&&this._events[e](),this._allResorceData.forEach((t,s)=>{if(t.stageName===e){if(s===this._allResorceData.length-1)return;this._mutileStageStartLoad(this._allResorceData[s+1].stageName)}}))}_progressDetect(){const e=()=>{this._progress<this._targetProgress&&(this._progress++,this._targetTextDom&&(this._targetTextDom.innerText=this._progress),this._events.progress({progress:this._progress}),this._progress===this._targetProgress&&clearInterval(this._progressChangeTimer),this._progress===100&&this._loadFinish(),this._progress<60&&this._targetProgress===100&&this.needSpeedUp&&(clearInterval(this._progressChangeTimer),this._progressChangeTimer=setInterval(e,0),this.needSpeedUp=!1))};this._progressChangeTimer=setInterval(e,this.progressSpeed)}_trueLoadControl(){const e=this._loadedCount/this._allResourceCount;this._addonLoadFunc?(this._targetProgress=Math.ceil(e*40)+Math.ceil(this._addonLoadedRatio*30)+20,e===1&&this._addonLoadedRatio===1&&(this._targetProgress=100,this._events.trueLoadFinish&&this._events.trueLoadFinish())):(this._targetProgress=Math.ceil(e*60)+20,e===1&&(this._targetProgress=100,this._events.trueLoadFinish&&this._events.trueLoadFinish()))}setAddonLoadFunc(e){this._addonLoadFunc=e}setAddonLoadData(e){this._addonLoadedRatio=e,this._trueLoadControl()}_loadFinish(){clearInterval(this._progressChangeTimer),this._events.countComplete&&this._events.countComplete()}addEventListener(e,t){if(e in this._events)this._events[e]=t;else throw new Error("没有这个名字的事件可以设置")}}return a});

const sl = new SiteLoader(
    [
        {
            sources: [
                {
                    sourceType:'media',
                    selectors:['.hero video']
                },
                {
                    sourceType:'image',
                    selectors:['#image']
                }
            ]
        }
    ]
)

const loadingBar = document.querySelector('.loading-color')
const loadingContainer = document.querySelector('.loading-container')
const loadingBG = document.querySelector('.loading-BG')
const loadingLogo = document.querySelector('.loading-logo')
const loadingNum = document.querySelector('.loading-num')

sl.addEventListener('progress', (e) => {
    loadingBar.style.transform = `translateX(-${100-e.progress}%)`
})

sl.addEventListener('countComplete',()=>{
    document.body.style.overflow = 'auto'
    // loadingContainer.classList.add('loading-disappear')
    loadingBG.classList.add('loading-BG-disappear')
    loadingLogo.classList.add('loading-logo-disappear')
    loadingBar.classList.add('loading-bar-disappear')
    loadingNum.classList.add('loading-num-disappear')

    // 延迟执行 hero 动画
    setTimeout(() => {
        const heroH1 = document.querySelector('.hero h1');
        const heroP = document.querySelector('.hero p');
        const heroBtn = document.querySelector('.hero .btn');

        // 添加 appear 类来触发动画
        heroH1.classList.add('fade-up-animation');
        setTimeout(() => {
            heroP.classList.add('fade-up-animation');
            setTimeout(() => {
                heroBtn.classList.add('fade-up-animation');
            }, 0);
        }, 300);
    }, 900); 

})

loadingContainer.addEventListener('transitionend',()=>{
    loadingContainer.style.display = 'none'
})

// sl.setTargetTextDom('.loading-num')
sl.needSpeedUp = true
sl.startLoad()
