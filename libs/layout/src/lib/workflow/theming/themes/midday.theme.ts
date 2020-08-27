import { Theme } from '../symbols';

export const middayTheme: Theme = {
  name: 'midday',
  properties: {
    // ##### General
    '--background': '#c7c7c7',
    '--bar': '#D7D7D7',
    '--app-menu': '#E2E2E2',
    '--app-menu-transparent': '#E2E2E2d6',
    '--border': '#f2f2f2',
    '--action-panel': '#F2F2F2',
    '--action-panel-nav': '#E4E4E4',
    '--modal': '#c5c5c5',
    '--panel': '#f2f2f2',
    '--toastr': '#f2f2f2',
    '--icon-container': '#BEBEBE',
    '--icon-container-hover': '#f5f5f5',
    '--icon': '#3A3A39',
    '--icon-button': '#BEBEBE',
    '--icon-background': '#BEBEBE',
    '--icon-background-secondary': 'rgba(37, 37, 37, 0.1)',
    '--icon-hover': '#8c8c8c',
    '--icon-active-hover': '#006C89',
    '--box-shadow': 'rgba(60, 56, 56, 0.3)',
    '--radius': '0.25rem',
    '--disabled': '0.5',
    '--dropdown-background': '#e4e4e4',
    '--scratch': '#FDF2AB',
    '--scratch-header': '#FCEB81',
    '--scratch-border': '#EDE19F',
    '--scratch-text': '#666144',
    '--border-color': '#f2f2f2',
    '--display-reminder': '#f2f2f2',
    '--display-card-hover': '#BEBEBE',

    //######## Paginator
    '--paginator-text-active': '#f2f2f2',
    '--paginator-background-active': '#046F8D',
    '--paginatior-background-default': '#F4F4F4',

    //######## Date Picker
    '--DatePicker-text-active': '#f2f2f2',
    '--DatePicker-background-default': '#F4F4F4',
    '--DatePicker-background-active': '#046F8D',
    '--DatePicker-glow': '#00000012',
    '--calendar-default': '#e0e0e0',

    //######## Fonts
    '--primary-font': 'Titillium Web',

    // ##### buttons
    '--button-background-primary': '#046F8D',
    '--button-background-secondary': '#f3b300',
    '--button-background-success': '#4CAF50',
    '--button-background-alert': '#c54f00',
    '--button-background-warn': '#ff9800',
    '--button-background-danger': '#e53935',

    '--button-text-primary': '#EDEDED',
    '--button-text-secondary': '#EDEDED',
    '--button-text-success': '#EDEDED',
    '--button-text-alert': '#EDEDED',
    '--button-text-warn': '#EDEDED',
    '--button-text-danger': '#EDEDED',

    '--button-background': '#EDEDED',
    '--button-shadow': '#939393',
    '--button-text': '#3A3A39',
    '--accordion-btn-default': '#D8DDE9',

    //##### tab bar
    '--tab-glow-primary': '#0764ff33',

    //##### Text
    '--text-primary': '#3A3A39',
    '--text-primary-hover': '#046F8D',
    '--heading-secondary': '#006C89',
    '--heading-primary': '#4E4E4E',
    '--heading-sub': '#939393',
    '--text-primary-active': '#046F8D',
    '--app-bar-heading-size': '1.4rem',

    //##### Colours
    '--primary': '#046F8D',
    '--primary-dark': '#006C89',
    '--primary-light': '#00C2FF',
    '--secondary': '#d09100',
    '--secondary-dark': '#ffa000',
    '--secondary-light': '#d09100',
    '--success': '#318835',
    '--success-dark': '#218225',
    '--success-light': '#4CAF50',
    '--alert': '#c54f00',
    '--alert-dark': '#BA5300',
    '--alert-light': '#c54f00',
    '--warning': '#ff9800',
    '--warning-dark': '#d84315',
    '--warning-light': '#ff9800',
    '--danger': '#e53935',
    '--danger-dark': '#b71c1c',
    '--danger-light': '#e57373',
    '--date-picker-cell': '#f4f4f4',
    '--inlineError-text': '#F1F1F1',

    //##### Linear Gradients
    '--linear-gradient-default': '#00000012',
    '--linear-gradient-default-2': '#00000012',
    '--linear-gradient-button-default': '#00000012',
    '--linear-gradient-primary': '#00000012',
    '--linear-gradient-primary-light': '#00000012',
    '--linear-gradient-secondary': '#00000012',
    '--linear-gradient-secondary-light': '#00000012',
    '--linear-gradient-success': '#00000012',
    '--linear-gradient-alert': '#00000012',
    '--linear-gradient-warning': '#00000012',
    '--linear-gradient-danger': '#00000012',

    // '--linear-gradient-default': '#FFFFFF',
    // '--linear-gradient-default-2': '#0064FF',
    // '--linear-gradient-button-default': '#979797',
    // '--linear-gradient-primary': '#046F8D',
    // '--linear-gradient-primary-light': '#2196F3',
    // '--linear-gradient-secondary': '#FF9800',
    // '--linear-gradient-secondary-light': '#FFC107',
    // '--linear-gradient-success': '#4CAF50',
    // '--linear-gradient-alert': '#ff9800',
    // '--linear-gradient-warning': '#ff5722',
    // '--linear-gradient-danger': '#e53935',

    //##### Radial Gradients
    '--radial-gradient-default': '#FFFFFF',
    '--radial-gradient-primary': '#D7D7D7',
    '--radial-gradient-secondary': '#D7D7D7',
    '--radial-gradient-danger': '#e539354d',
    '--radial-gradient-tab-glow': '#00000012',

    '--linear-gradient-policyHistory': '#80808000;',

    '--linear-gradient-theme': '#00000012',
    '--box-shadow-theme': '#D7D7D7',

    // ##### Forms
    '--input-background': '#E6E7E7',
    '--input-background-active': '#f5f5f5',
    '--input-border-colour': '#b3b3b3',
    '--input-placeholder': '#9BA4A3',
    '--input-text': '#717883',
    '--input-text-active': '#717883',
    '--label-colour': '#5d5d5d',
    '--selectList-active': '#046F8D',
    '--selectList-text-active': '#E6E7E7',
    '--input-autofill-background': '#D8DDE9',

    // ##### Lists
    '--list-item-background': '#D8DDE9',

    // ##### Modal
    '--modal-border-alert': '#c54f00',
    '--modal-border-info': '#046F8D',
    '--modal-border-danger': '#e53935',

    '--modal-shadow-alert': '#565656',
    '--modal-shadow-info': '#565656',
    '--modal-shadow-danger': '#565656',

    '--modal-x-shadow': '8px',
    '--modal-blur-shadow': '20px',

    // ##### Workflow
    '--colour-1': '#046F8D',
    '--colour-1-dark': '#046F8D',
    '--colour-1-light': '#00DCFF',
    '--colour-1-glow': '#00000012',

    '--colour-2': '#63C767',
    '--colour-2-dark': '#63C767',
    '--colour-2-light': '#009915',
    '--colour-2-glow': '#00000012',

    '--colour-3': '#FF3D7F',
    '--colour-3-dark': '#DC356E',
    '--colour-3-light': '#FF2DB9',
    '--colour-3-glow': '#00000012',

    '--colour-4': '#820081',
    '--colour-4-dark': '#670266',
    '--colour-4-light': '#DA3DFF',
    '--colour-4-glow': '#00000012',

    '--colour-5': '#FFB300',
    '--colour-5-dark': '#FF9900',
    '--colour-5-light': '#FFF23D',
    '--colour-5-glow': '#00000012',

    '--colour-6': '#FA6400',
    '--colour-6-dark': '#FA6400',
    '--colour-6-light': '#FFEE00',
    '--colour-6-glow': '#00000012',

    '--colour-7': '#E53935',
    '--colour-7-dark': '#E53935',
    '--colour-7-light': '#FF4A4A',
    '--colour-7-glow': '#00000012',

    '--colour-8': '#BEBEBE',
    '--colour-8-dark': '#BEBEBE',
    '--colour-8-light': '#BEBEBE',
    '--colour-8-glow': '#00000012',

    '--colour-9': '#ff9800',
    '--colour-9-dark': '#d84315',
    '--colour-9-light': '#ff8a65',
    '--colour-9-glow': '#00000012',

    '--claim-card': '#F2F2F2',
    '--claim-card-hover': '#F5F5F5',
    '--claim-card-gradient-color-1-a': '#C7F0FF',
    '--claim-card-gradient-color-1-b': '#FBFBFB',
    '--claim-card-gradient-color-1-hover': '#F5F5F5',
    '--claim-card-gradient-color-2-a': '#C9FFE3',
    '--claim-card-gradient-color-2-b': '#FBFBFB',
    '--claim-card-gradient-color-2-hover': '#F5F5F5',
    '--claim-card-gradient-color-3-a': '#FFC9EF',
    '--claim-card-gradient-color-3-b': '#FBFBFB',
    '--claim-card-gradient-color-3-hover': '#F5F5F5',
    '--claim-card-gradient-color-4-a': '#EFC9FF',
    '--claim-card-gradient-color-4-b': '#FBFBFB',
    '--claim-card-gradient-color-4-hover': '#F5F5F5',
    '--claim-card-gradient-color-5-a': '#FFFAC9',
    '--claim-card-gradient-color-5-b': '#FBFBFB',
    '--claim-card-gradient-color-5-hover': '#F5F5F5',
    '--claim-card-gradient-color-6-a': '#FFEBCC',
    '--claim-card-gradient-color-6-b': '#FBFBFB',
    '--claim-card-gradient-color-6-hover': '#F5F5F5',
    '--claim-card-gradient-color-7-a': '#FFC9C9',
    '--claim-card-gradient-color-7-b': '#FBFBFB',
    '--claim-card-gradient-color-7-hover': '#F5F5F5',
    '--claim-card-text': '#747474',
    '--claim-card-text-actionable': '#CBCBCB',
    '--claim-card-icon': '#747474',
    '--claim-card-icon-actionable': '#CBCBCB',
    '--job-card': '#E6E7E7',
    '--job-card-hover': '#F5F5F5',
    '--job-card-gradient-colour-1-a': '#1C4058',
    '--job-card-gradient-colour-1-b': '#FFFFFF',
    '--job-card-gradient-colour-1-hover': '#F5F5F5',
    '--job-card-gradient-colour-2-a': '#CEFFE5',
    '--job-card-gradient-colour-2-b': '#FFFFFF',
    '--job-card-gradient-colour-2-hover': '#F5F5F5',
    '--job-card-gradient-colour-3-a': '#FFDEE9',
    '--job-card-gradient-colour-3-b': '#FFFFFF',
    '--job-card-gradient-colour-3-hover': '#F5F5F5',
    '--job-card-gradient-colour-4-a': '#DDD1F0',
    '--job-card-gradient-colour-4-b': '#FFFFFF',
    '--job-card-gradient-colour-4-hover': '#F5F5F5',
    '--job-card-gradient-colour-5-a': '#FFEFC1',
    '--job-card-gradient-colour-5-b': '#FFFFFF',
    '--job-card-gradient-colour-5-hover': '#F5F5F5',
    '--job-card-gradient-colour-6-a': '#FFF0C4',
    '--job-card-gradient-colour-6-b': '#FFFFFF',
    '--job-card-gradient-colour-6-hover': '#F5F5F5',
    '--job-card-gradient-colour-7-a': '#FDD9D8',
    '--job-card-gradient-colour-7-b': '#FFFFFF',
    '--job-card-gradient-colour-7-hover': '#F5F5F5',
    '--job-card-text': '#747474',
    '--job-card-text-actionable': '#CBCBCB',
    '--job-card-icon': '#747474',
    '--job-card-icon-actionable': '#CBCBCB',
    '--card-container-shadow': 'rgba(0,0,0,0.3)',

    //// STANDARD BANK LOGO
    '--logo-text': '#00529C',

    /// MAPS
    '--map-buttons-background': '#F1F1F1',
    '--map-placeholder': '#b8b8b8'

    // //general
    // '--primary': '#0078d7',
    // '--on-primary': '#ffffff',
    // '--secondary': '#0089FF',
    // '--on-secondary': '#ffffff',
    // '--surface': '#212121',
    // '--on-surface': '#ffffff',
    // '--default-margin-bottom': '2rem',
    // '--claim-info': 'rgb(39,39,39)',
    // '--hover-claim': '#008CA2',
    // '--hover-job': 'rgba(151, 140, 140, 0.6)',
    // '--claim-name': 'rgb(58, 58, 58)',
    // '--job-title': 'rgb(73, 73, 73)',
    // '--job-content': 'rgb(109, 109, 109)',
    // // Depth (Greys)
    // '--dp0-colour': 'hsla(0,0%,100%,1)',
    // '--dp1-colour': 'hsla(0,0%,95%,1)',
    // '--dp2-colour': 'hsla(0,0%,93%,1)',
    // '--dp3-colour': 'hsla(0,0%,87%,1)',
    // '--dp4-colour': 'hsla(0,0%,91%,1)',
    // '--dp6-colour': 'hsla(0,0%,89%,1)',
    // '--dp8-colour': 'hsla(0,0%,88%,1)',
    // '--dp12-colour': 'hsla(0,0%,86%,1)',
    // '--dp16-colour': 'hsla(0,0%,85%,1)',
    // '--dp24-colour': 'hsla(0,0%,84%,1)',
    // '--dp26-colour': 'hsla(0,0%,70%,1)',
    // '--dp27-colour': 'hsla(0,0%,62%,1)',
    // '--dp30-colour': 'hsla(0,0%,45%,0.7)',
    // // buttons
    // '--button-default': '#929292',
    // '--button-primary': '#7C7C7C',
    // '--standard-button': '#3e8885',
    // '--secondary-button': '#0064FF',
    // '--primary-button': '',
    // '--default-button ': '#838383',
    // '--inset-primary': '0px 0px 0.5em hsla(0, 0%, 5%, 0.8)',
    // '--button-background': '#FAFBFF',
    // // pagination
    // '--pageination-primary': 'hsla(0,0%,88%,1)',
    // '--pageination-font-primary': '#333',
    // '--pageination-font-current': '#fff',
    // '--pageination-gradient-primary': 'rgb(33, 33, 33)',
    // '--pageination-gradient-secondary': 'rgb(59, 59, 59)',
    // '--pageination-gradient-circle-primary': 'hsla(0,0%,88%,1)',
    // '--pageination-gradient-circle-secondary': 'hsla(0,0%,92%,1)',
    // '--pageination-border': 'rgb(156, 156, 156)',
    // '--pageination-border-inverse': 'rgb(172, 172, 172)',
    // '--pageination-box-shadow': 'rgba(27, 26, 26, 0.5)',
    // '--pageination-box-shadow-secondary': ' rgba(56, 55, 55, 0.5)',
    // //light and dark text
    // '--light-opacity': '1',
    // '--dark-opacity': '0.3',
    //
    // /////////////////////////////////////// NEW
    //
    //
    //
    //
    // ///////////// icons
    // '--icon-primary-enabled': '#949CAA',
    //
    // ///////////// claim-card
    // '--claim-card-primary': '#FBFBFB',
    //
    //
    //
    ////////////// gradient
    // '--linear-gradient-primary-1': '#EDF3FF',
    // '--linear-gradient-primary-2': '#0064FF',
    // '--linear-gradient-default-1': '#EDF3FF',
    // '--linear-gradient-default-2': '#0064FF',
    // '--radial-gradient-default-01-a': '#0064FF', // and background-default

    // '--linear-gradient-policyHistory-01': 'rgba(255, 255, 255, 0.3)',
    // '--linear-gradient-policyHistory-02': 'rgb(56, 133, 255, 0.1)',
  }
};
