export const metadata = {
  title: "접수 타이머",
  description: "고객 접수 시간 관리",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}

        {/* Channel Talk Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              var w=window;
              if(w.ChannelIO){
                return w.console.error("ChannelIO script included twice.");
              }
              var ch=function(){ch.c(arguments);};
              ch.q=[];
              ch.c=function(args){ch.q.push(args);};
              w.ChannelIO=ch;
              function l(){
                if(w.ChannelIOInitialized){
                  return;
                }
                w.ChannelIOInitialized=true;
                var s=document.createElement("script");
                s.type="text/javascript";
                s.async=true;
                s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";
                var x=document.getElementsByTagName("script")[0];
                if(x.parentNode){
                  x.parentNode.insertBefore(s,x);
                }
              }
              if(document.readyState==="complete"){
                l();
              }else{
                w.addEventListener("DOMContentLoaded",l);
                w.addEventListener("load",l);
              }
            })();

            ChannelIO('boot', {
              pluginKey: '${process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY}'
            });
            `,
          }}
        />
      </body>
    </html>
  );
}
