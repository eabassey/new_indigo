import { Theme } from '../symbols';

export const blackoutTheme: Theme = {
  name: 'blackout',
  properties: {
    // ##### General
    '--background': '#141414',
    '--bar': '#0D0D0D',
    '--app-menu': '#101010',
    '--app-menu-transparent': '#101010d6',
    '--border': '#272727',
    '--action-panel': '#101010',
    '--action-panel-nav': '#1C1C1C',
    '--modal': '#212121',
    '--panel': '#101010',
    '--toastr': '#0D0D0D',
    '--icon-container': '#CBCBCB',
    '--icon-container-hover': '#FFFFFF',
    '--icon': '#AFAFAF',
    '--icon-button': '#CBCBCB',
    '--icon-background': '#505050',
    '--icon-background-secondary': 'rgba(255, 255, 255, 0.1)',
    '--icon-hover': '#FFFFFF',
    '--icon-active': '#2962FF',
    '--icon-active-hover': '#00C2FF',
    '--icon-disabled': 'rgba(165,165,165,0.5)',
    '--box-shadow': 'rgba(2, 2, 2, 0.5)',
    '--radius': '0.25rem',
    '--disabled': '0.5',
    '--dropdown-background': '#0D0D0D',
    '--inlineError-text': '#F1F1F1',
    '--scratch': '#FDF2AB',
    '--scratch-header': '#FCEB81',
    '--scratch-border': '#EDE19F',
    '--scratch-text': '#666144',
    '--border-color': '#2b2b2b',
    '--display-reminder': '#F1F1F1',
    '--display-card-hover': '#272727',

    //######## Paginator
    '--paginator-text-active': '#2962FF',
    '--paginator-background-active': '#0D0D0D',
    '--paginatior-background-default': '#0D0D0D',

    //######## Date Picker
    '--DatePicker-text-active': '#A5A5A5',
    '--DatePicker-background-default': '#1e1e1e',
    '--DatePicker-background-active': '#0D0D0D',
    '--DatePicker-glow': '#2962FF',
    '--calendar-default': '#101010',

    //######## Fonts
    '--primary-font': 'Titillium Web',

    // ##### buttons

    '--button-background-primary': '#101010',
    '--button-background-secondary': '#101010',
    '--button-background-success': '#101010',
    '--button-background-alert': '#101010',
    '--button-background-warn': '#101010',
    '--button-background-danger': '#101010',

    '--button-text-primary': '#2962FF',
    '--button-text-secondary': '#FF9800',
    '--button-text-success': '#4CAF50',
    '--button-text-alert': '#ff9800',
    '--button-text-warn': '#ff5722',
    '--button-text-danger': '#e53935',

    '--button-background': '#101010',
    '--button-shadow': '#929292',
    '--button-text': '#A5A5A5',
    '--accordion-btn-default': '#1D1D1D',

    //##### tab bar
    '--tab-glow-primary': '#0764ff33',

    // ##### Text
    '--text-primary': '#A5A5A5',
    '--text-primary-hover': '#F1F1F1',
    '--heading-secondary': '#FFC107',
    '--heading-primary': '#A5A5A5',
    '--heading-sub': '#575757',
    '--text-primary-active': '#2962FF',
    '--app-bar-heading-size': '1.4rem',

    //##### Colours
    '--primary': '#2962FF',
    '--primary-dark': '#003d9b',
    '--primary-light': '#00C2FF',
    '--secondary': '#FF9800',
    '--secondary-dark': '#ffa000',
    '--secondary-light': '#FFC107',
    '--success': '#4CAF50',
    '--success-dark': '#388E3C',
    '--success-light': '#81c784',
    '--alert': '#ff9800',
    '--alert-dark': '#ef6c00',
    '--alert-light': '#ffb74d',
    '--warning': '#ff5722',
    '--warning-dark': '#d84315',
    '--warning-light': '#ff8a65',
    '--danger': '#e53935',
    '--danger-dark': '#b71c1c',
    '--danger-light': '#e57373',
    '--date-picker-cell': '#191919',

    //##### Linear Gradients
    '--linear-gradient-default': '#0D0D0D',
    '--linear-gradient-default-2': '#979797',
    '--linear-gradient-button-default': '#979797',
    '--linear-gradient-primary': '#2962FF',
    '--linear-gradient-primary-light': '#2196F3',
    '--linear-gradient-secondary': '#FF9800',
    '--linear-gradient-secondary-light': '#FFC107',
    '--linear-gradient-success': '#4CAF50',
    '--linear-gradient-alert': '#ff9800',
    '--linear-gradient-warning': '#ff5722',
    '--linear-gradient-danger': '#e53935',

    //##### Radial Gradients
    '--radial-gradient-default': '#0D0D0D',
    '--radial-gradient-primary': '#2962ff4d',
    '--radial-gradient-secondary': '#ffc1074d',
    '--radial-gradient-danger': '#e539354d',
    '--radial-gradient-tab-glow': '#2195f31a',

    '--linear-gradient-policyHistory': '#141414',

    '--linear-gradient-theme': '#2962FF',
    '--box-shadow-theme': '#2962FF',

    // ##### Forms
    '--input-background': '#1D1D1D',
    '--input-background-active': '#3B3B3B',
    '--input-border-colour': '#272727',
    '--input-placeholder': '#494949',
    '--input-text': '#ffffff',
    '--input-text-active': '#CBCBCB',
    '--label-colour': '#747474',
    '--selectList-active': '#121212',
    '--selectList-text-active': '#2962FF',
    '--input-autofill-background': '#1D1D1D',

    // ##### Lists
    '--list-item-background': '#041E40',

    // ##### Modal
    '--modal-border-alert': '#101010',
    '--modal-border-info': '#101010',
    '--modal-border-danger': '#101010',

    '--modal-shadow-alert': '#FF9800',
    '--modal-shadow-info': '#2962FF',
    '--modal-shadow-danger': '#e53935',

    '--modal-x-shadow': '0px',
    '--modal-blur-shadow': '150px',

    // ##### Workflow
    '--colour-1': '#2962FF',
    '--colour-1-dark': '#0D47A1',
    '--colour-1-light': '#64b5f6',
    '--colour-1-glow': '#2962FF',

    '--colour-2': '#4CAF50',
    '--colour-2-dark': '#2d6f30',
    '--colour-2-light': '#81c784',
    '--colour-2-glow': '#4CAF50',

    '--colour-3': '#E91E63',
    '--colour-3-dark': '#C2185B',
    '--colour-3-light': '#f06292',
    '--colour-3-glow': '#E91E63',

    '--colour-4': '#be2edd',
    '--colour-4-dark': '#7c0f94',
    '--colour-4-light': '#e056fd',
    '--colour-4-glow': '#be2edd',

    '--colour-5': '#ffc107',
    '--colour-5-dark': '#ffa000',
    '--colour-5-light': '#ffe082',
    '--colour-5-glow': '#ffc107',

    '--colour-6': '#FF9800',
    '--colour-6-dark': '#c56400',
    '--colour-6-light': '#FFA25A',
    '--colour-6-glow': '#c56400',

    '--colour-7': '#e53935',
    '--colour-7-dark': '#961616',
    '--colour-7-light': '#e57373',
    '--colour-7-glow': '#e53935',

    '--colour-8': '#1D1D1D',
    '--colour-8-dark': '#141414',
    '--colour-8-light': '#1D1D1D',
    '--colour-8-glow': '#1D1D1D',

    '--colour-9': '#ff5722',
    '--colour-9-dark': '#d84315',
    '--colour-9-light': '#ff8a65',
    '--colour-9-glow': '#ff5722',

    '--claim-card': '#242424',
    '--claim-card-hover': '#444444',
    '--claim-card-gradient-color-1-a': '#2C4164',
    '--claim-card-gradient-color-1-b': '#333333',
    '--claim-card-gradient-color-1-hover': '#444444',
    '--claim-card-gradient-color-2-a': '#195E23',
    '--claim-card-gradient-color-2-b': '#333333',
    '--claim-card-gradient-color-2-hover': '#444444',
    '--claim-card-gradient-color-3-a': '#4B1A2A',
    '--claim-card-gradient-color-3-b': '#333333',
    '--claim-card-gradient-color-3-hover': '#444444',
    '--claim-card-gradient-color-4-a': '#331632',
    '--claim-card-gradient-color-4-b': '#333333',
    '--claim-card-gradient-color-4-hover': '#444444',
    '--claim-card-gradient-color-5-a': '#56572A',
    '--claim-card-gradient-color-5-b': '#333333',
    '--claim-card-gradient-color-5-hover': '#444444',
    '--claim-card-gradient-color-6-a': '#68452E',
    '--claim-card-gradient-color-6-b': '#333333',
    '--claim-card-gradient-color-6-hover': '#444444',
    '--claim-card-gradient-color-7-a': '#5D1C1A',
    '--claim-card-gradient-color-7-b': '#333333',
    '--claim-card-gradient-color-7-hover': '#444444',
    '--claim-card-text': '#747474',
    '--claim-card-text-actionable': '#CBCBCB',
    '--claim-card-icon': '#747474',
    '--claim-card-icon-actionable': '#CBCBCB',
    '--job-card': '#1D1D1D',
    '--job-card-hover': '#262626',
    '--job-card-gradient-colour-1-a': '#1C4058',
    '--job-card-gradient-colour-1-b': '#1E1E1E',
    '--job-card-gradient-colour-1-hover': '#262626',
    '--job-card-gradient-colour-2-a': '#173A1B',
    '--job-card-gradient-colour-2-b': '#1E1E1E',
    '--job-card-gradient-colour-2-hover': '#262626',
    '--job-card-gradient-colour-3-a': '#173A1B',
    '--job-card-gradient-colour-3-b': '#1E1E1E',
    '--job-card-gradient-colour-3-hover': '#262626',
    '--job-card-gradient-colour-4-a': '#173A1B',
    '--job-card-gradient-colour-4-b': '#1E1E1E',
    '--job-card-gradient-colour-4-hover': '#262626',
    '--job-card-gradient-colour-5-a': '#173A1B',
    '--job-card-gradient-colour-5-b': '#1E1E1E',
    '--job-card-gradient-colour-5-hover': '#262626',
    '--job-card-gradient-colour-6-a': '#392B14',
    '--job-card-gradient-colour-6-b': '#1E1E1E',
    '--job-card-gradient-colour-6-hover': '#262626',
    '--job-card-gradient-colour-7-a': '#173A1B',
    '--job-card-gradient-colour-7-b': '#1E1E1E',
    '--job-card-gradient-colour-7-hover': '#262626',
    '--job-card-text': '#747474',
    '--job-card-text-actionable': '#CBCBCB',
    '--job-card-icon': '#747474',
    '--job-card-icon-actionable': '#CBCBCB',
    '--card-container-shadow': '#003F5F',

    //// STANDARD BANK LOGO
    '--logo-text': '#FFFFFF',

    /// MAPS
    '--map-buttons-background': '#3C3C3C',
    '--map-placeholder': '#b8b8b8'

    //   //general
    //   // '--primary': '#0078d7',
    //   '--on-primary': '#ffffff',
    //   '--on-secondary': '#ffffff',
    //   '--surface': '#212121',
    //   '--on-surface': '#ffffff',
    //   '--default-margin-bottom': '2rem',
    //   '--claim-info': 'rgb(231,231,231)',
    //   '--hover-claim': '#00c2d9',
    //   '--hover-job': 'rgba(151, 140, 140, 0.6)',
    //   '--claim-name': '#fff',
    //   '--job-title': '#ccc',
    //   '--job-content': 'rgb(235,235,235)',
    //   // Depth (Greys)
    //   '--dp0-colour': 'hsla(0,0%,0%,1)',
    //   '--dp1-colour': 'hsla(0,0%,5%,1)',
    //   '--dp2-colour': 'hsla(0,0%,7%,1)',
    //   '--dp3-colour': 'hsla(0,0%,8%,1)',
    //   '--dp4-colour': 'hsla(0,0%,9%,1)',
    //   '--dp6-colour': 'hsla(0,0%,11%,1)',
    //   '--dp8-colour': 'hsla(0,0%,12%,1)',
    //   '--dp12-colour': 'hsla(0,0%,14%,1)',
    //   '--dp16-colour': 'hsla(0,0%,15%,1)',
    //   '--dp24-colour': 'hsla(0,0%,16%,1)',
    //   '--dp26-colour': 'hsla(0,0%,20%,1)',
    //   '--dp27-colour': 'hsla(0,0%,26%,1)',
    //   '--dp30-colour': 'hsla(0,0%,85%,0.7)',
    //
    //   // buttons

    //   '--standard-button': '#3e8885',
    //   '--secondary-button': '#009915',
    //   '--primary-button': '',
    //   '--default-button ': '#cecece',
    //   '--inset-primary': '0px 0px 1em hsla(0, 0%, 5%, 1)',
    //   // pagination
    //   '--pageination-primary': 'rgb(172, 172, 172)',
    //   '--pageination-font-primary': '#fff',
    //   '--pageination-font-current': '#333',
    //   '--pageination-gradient-primary': 'rgb(218, 218, 218)',
    //   '--pageination-gradient-secondary': 'rgb(236, 230, 230)',
    //   '--pageination-gradient-circle-primary': 'rgba(157, 157, 157, 0.5)',
    //   '--pageination-gradient-circle-secondary': 'rgba(0, 0, 0, 0)',
    //   '--pageination-border': 'rgb(172, 172, 172)',
    //   '--pageination-border-inverse': 'rgb(73, 73, 73)',
    //   '--pageination-box-shadow': 'rgba(197, 197, 197, 0.5)',
    //   '--pageination-box-shadow-secondary': 'rgba(197, 197, 197, 0.5)',
    //   //light and dark text
    //   '--light-opacity': '0.3',
    //   '--dark-opacity': '1',
    //
    //   /////////////////////////////////////// NEW
    //
    //
    //   ///////////// icons
    //   '--icon-primary-enabled': '#FFFFFF',
    //
    //   ///////////// claim-card
    //   '--claim-card-primary': '#333333',
    //
    //
    //
    ////////////// gradient
  }
};
