window.addEventListener("load",function(){var e=document.getElementById("time-updated"),t=Date.parse(e.getElementsByTagName("time")[0].dateTime),a=new Date,n=-Math.abs(a-t),i="hour";n/36e5<=-1?n/=36e5:n/6e4<=-1?(n/=6e4,i="minute"):(n/=1e3,i="second"),n=Math.ceil(n).toFixed();var o=window.location.pathname.substring(1,3),s=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"always",style:"long"});e.innerHTML+=`<span style="white-space:nowrap"> ~ ${s.format(n,i)}</span>`});