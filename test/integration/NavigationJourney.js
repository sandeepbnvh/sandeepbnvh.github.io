sap.ui.define(["sap/ui/test/opaQunit","./pages/App","./pages/App"],function(e){"use strict";QUnit.module("Navigation Journey");e("Should see the initial page of the app",function(e,p,i){e.iStartMyApp();i.onTheAppPage.iShouldSeeTheApp();i.onTheViewPage.iShouldSeeThePageView();i.iTeardownMyApp()})});