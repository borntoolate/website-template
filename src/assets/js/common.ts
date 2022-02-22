/* ****************************************************************************************************

  # common.js

**************************************************************************************************** */
import '@babel/polyfill';
require('element-closest-polyfill');

// ResizeManager
// import {ResizeManager} from './module/common/resize-manager';

// Loading
import {Loading} from './module/common/loading';

// SetGnav
import {SetGnav} from './module/common/set-gnav';

// SommonScroll
import {CommonScroll} from './module/common/common-scroll';

// Placeholder
import {Placeholder} from './module/common/placeholder';

// SetWidth
import {SetWidth} from './module/common/set-width';

// smoothScroll
import {SmoothScroll} from './module/common/smooth-scroll';

// CommonAccordion
import {CommonAccordion} from './module/common/common-accordion';

// CommonTab
import {CommonTab} from './module/common/common-tab';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    // const resizeManager = new ResizeManager();

    new Loading();
    new SetGnav();
    new CommonScroll('js-inview');
    Placeholder.init();
    SetWidth.init();
    SmoothScroll.init();
    CommonAccordion.init();
    CommonTab.init();

    // resizeManager.add(hoge.init.bind(hoge));
    // resizeManager.init();
  },
  false
);
