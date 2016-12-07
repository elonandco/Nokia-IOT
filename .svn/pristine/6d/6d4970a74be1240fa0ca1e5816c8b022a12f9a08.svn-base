import {Router} from '@angular/router-deprecated';
import {LoginComponent} from './components/auth/login.component';
import {UserComponent} from './components/users/user.component';
import {UserGroupComponent} from './components/userGroups/user-group.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddCampaignComponent} from "../custom/components/dashboard/campaigns/add-campaign.component";
import {CampaignDetailComponent} from "../custom/components/dashboard/campaigns/campaign-detail.component";
import {AddFirmwareComponent} from "../custom/components/dashboard/firmware/add-firmware.component";
import {ViewFirmwareComponent} from "../custom/components/dashboard/firmware/view-firmware.component";
import {AddPolicyComponent} from "../custom/components/dashboard/policy/add-policy.component";
import {ViewPolicyComponent} from "../custom/components/dashboard/policy/view-policy.component";
import {GroupsDetailComponent} from "../custom/components/dashboard/groups/groups-detail.component";
import {DevicesDetailComponent} from "../custom/components/dashboard/devices/devices-detail.component";
import {UsersDetailComponent} from "../custom/components/dashboard/users/users-detail.component";
import {pageWrapper} from './components/pageWrapper/page-wrapper.component';
import {ResetPasswordComponent} from "../custom/components/account/reset-password/reset-password.component";
import {FirmwareDetailComponent} from "../custom/components/dashboard/firmware/firmware-detail.component";
/**
 * Abstract Application class that defines common routes for applications that extend from it
 */
export abstract class App {
  constructor() {
    
  }

  protected _getDefaultRouterConfig() {
    return [
      {
        path: '/login',
        name: 'Login',
        component: LoginComponent
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: '/user',
        name: 'User',
        component: UserComponent,
      },
      {
        path: '/usergroup',
        name: 'UserGroup',
        component: UserGroupComponent,
      },
      {
        path: 'addFirmware',
        name: 'EAP_IOT_ADD_FIRMWARE',
        component: AddFirmwareComponent,
        data:{type:'Firmware'}
      },
      {
        path: 'addPolicy',
        name: 'EAP_IOT_ADD_POLICY',
        component: AddPolicyComponent,
        data:{type:'Policy'}
      },
      {
        path: 'viewPolicy',
        name: 'EAP_IOT_VIEW_POLICY',
        component: ViewPolicyComponent,
        data:{type:'Policy'}
      },
      {
        path: 'groupsDetail',
        name: 'EAP_IOT_VIEW_GROUPS_TREE_MENU',
        component: GroupsDetailComponent,
        data:{type:'Groups'}
      },
      {
        path: 'devicesDetail',
        name: 'EAP_IOT_VIEW_DEVICES',
        component: DevicesDetailComponent,
        data: {type: 'Devices'}
      },
      {
        path: 'usersDetail',
        name: 'EAP_IOT_VIEW_USERS',
        component: UsersDetailComponent,
        data:{type:'Users'}
      },
      {
        path: 'campaigns',
        name: 'EAP_IOT_VIEW_CAMPAIGNS_MENU',
        component: pageWrapper,
        data: {type: 'Campaigns'}
      },
      {
       path: 'addCampaign',
       name: 'EAP_IOT_ADD_CAMPAIGN',
       component: AddCampaignComponent,
       data:{type:'Campaign'}
      },
      {
       path: 'viewCampaign',
       name: 'EAP_IOT_VIEW_CAMPAIGNS',
       component: CampaignDetailComponent,
       data:{type:'Campaign'}
      },
      {
        path: 'resetPassword',
        name: 'EAP_IOT_RESET_PASSWORD',
        component: ResetPasswordComponent,
        data:{type:'ResetPassword'}
      },
      {
        path: 'firmwareDetail',
        name: 'EAP_IOT_VIEW_FIRMWARE',
        component: FirmwareDetailComponent,
        data:{type:'Firmwares'}
      }];
  }
}
