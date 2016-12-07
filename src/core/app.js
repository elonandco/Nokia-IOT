System.register(['./components/auth/login.component', './components/users/user.component', './components/userGroups/user-group.component', './components/dashboard/dashboard.component', "../custom/components/dashboard/campaigns/add-campaign.component", "../custom/components/dashboard/campaigns/campaign-detail.component", "../custom/components/dashboard/firmware/add-firmware.component", "../custom/components/dashboard/policy/add-policy.component", "../custom/components/dashboard/policy/view-policy.component", "../custom/components/dashboard/groups/groups-detail.component", "../custom/components/dashboard/devices/devices-detail.component", "../custom/components/dashboard/users/users-detail.component", './components/pageWrapper/page-wrapper.component', "../custom/components/account/reset-password/reset-password.component", "../custom/components/dashboard/firmware/firmware-detail.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var login_component_1, user_component_1, user_group_component_1, dashboard_component_1, add_campaign_component_1, campaign_detail_component_1, add_firmware_component_1, add_policy_component_1, view_policy_component_1, groups_detail_component_1, devices_detail_component_1, users_detail_component_1, page_wrapper_component_1, reset_password_component_1, firmware_detail_component_1;
    var App;
    return {
        setters:[
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (user_group_component_1_1) {
                user_group_component_1 = user_group_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (add_campaign_component_1_1) {
                add_campaign_component_1 = add_campaign_component_1_1;
            },
            function (campaign_detail_component_1_1) {
                campaign_detail_component_1 = campaign_detail_component_1_1;
            },
            function (add_firmware_component_1_1) {
                add_firmware_component_1 = add_firmware_component_1_1;
            },
            function (add_policy_component_1_1) {
                add_policy_component_1 = add_policy_component_1_1;
            },
            function (view_policy_component_1_1) {
                view_policy_component_1 = view_policy_component_1_1;
            },
            function (groups_detail_component_1_1) {
                groups_detail_component_1 = groups_detail_component_1_1;
            },
            function (devices_detail_component_1_1) {
                devices_detail_component_1 = devices_detail_component_1_1;
            },
            function (users_detail_component_1_1) {
                users_detail_component_1 = users_detail_component_1_1;
            },
            function (page_wrapper_component_1_1) {
                page_wrapper_component_1 = page_wrapper_component_1_1;
            },
            function (reset_password_component_1_1) {
                reset_password_component_1 = reset_password_component_1_1;
            },
            function (firmware_detail_component_1_1) {
                firmware_detail_component_1 = firmware_detail_component_1_1;
            }],
        execute: function() {
            /**
             * Abstract Application class that defines common routes for applications that extend from it
             */
            App = (function () {
                function App() {
                }
                App.prototype._getDefaultRouterConfig = function () {
                    return [
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                        },
                        {
                            path: '/user',
                            name: 'User',
                            component: user_component_1.UserComponent,
                        },
                        {
                            path: '/usergroup',
                            name: 'UserGroup',
                            component: user_group_component_1.UserGroupComponent,
                        },
                        {
                            path: 'addFirmware',
                            name: 'EAP_IOT_ADD_FIRMWARE',
                            component: add_firmware_component_1.AddFirmwareComponent,
                            data: { type: 'Firmware' }
                        },
                        {
                            path: 'addPolicy',
                            name: 'EAP_IOT_ADD_POLICY',
                            component: add_policy_component_1.AddPolicyComponent,
                            data: { type: 'Policy' }
                        },
                        {
                            path: 'viewPolicy',
                            name: 'EAP_IOT_VIEW_POLICY',
                            component: view_policy_component_1.ViewPolicyComponent,
                            data: { type: 'Policy' }
                        },
                        {
                            path: 'groupsDetail',
                            name: 'EAP_IOT_VIEW_GROUPS_TREE_MENU',
                            component: groups_detail_component_1.GroupsDetailComponent,
                            data: { type: 'Groups' }
                        },
                        {
                            path: 'devicesDetail',
                            name: 'EAP_IOT_VIEW_DEVICES',
                            component: devices_detail_component_1.DevicesDetailComponent,
                            data: { type: 'Devices' }
                        },
                        {
                            path: 'usersDetail',
                            name: 'EAP_IOT_VIEW_USERS',
                            component: users_detail_component_1.UsersDetailComponent,
                            data: { type: 'Users' }
                        },
                        {
                            path: 'campaigns',
                            name: 'EAP_IOT_VIEW_CAMPAIGNS_MENU',
                            component: page_wrapper_component_1.pageWrapper,
                            data: { type: 'Campaigns' }
                        },
                        {
                            path: 'addCampaign',
                            name: 'EAP_IOT_ADD_CAMPAIGN',
                            component: add_campaign_component_1.AddCampaignComponent,
                            data: { type: 'Campaign' }
                        },
                        {
                            path: 'viewCampaign',
                            name: 'EAP_IOT_VIEW_CAMPAIGNS',
                            component: campaign_detail_component_1.CampaignDetailComponent,
                            data: { type: 'Campaign' }
                        },
                        {
                            path: 'resetPassword',
                            name: 'EAP_IOT_RESET_PASSWORD',
                            component: reset_password_component_1.ResetPasswordComponent,
                            data: { type: 'ResetPassword' }
                        },
                        {
                            path: 'firmwareDetail',
                            name: 'EAP_IOT_VIEW_FIRMWARE',
                            component: firmware_detail_component_1.FirmwareDetailComponent,
                            data: { type: 'Firmwares' }
                        }];
                };
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map