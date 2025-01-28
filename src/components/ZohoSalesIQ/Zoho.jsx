import React from 'react';
import { useEffect } from 'react';

//Zoho Sales Iq Script:
const useScript = (url, widgetCode) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');

    let code = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "${widgetCode}", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${url}";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);d.innerHTML = "<div id='zsiqwidget'></div>";`;

    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

const ZohoSalesIQ = () => {
  return (
    <React.Fragment>
      {useScript(
        'https://salesiq.zoho.in/widget',
        '3edf65a468af1d9ec72c31adb273c139a09c4340d0061a773c29bfd5e5b3f44a'
      )}
    </React.Fragment>
  );
}

export default ZohoSalesIQ;