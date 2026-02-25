import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

/**
 * Ant Design Vue 全域主題設定
 * 包含所有可用的 Design Tokens
 *
 * 參考文件: https://antdv.com/docs/vue/customize-theme
 */
export const themeConfig = {
  token: {
    // ========================================================================
    // Custom Tokens (自定義變數)
    // ========================================================================
    /**
     * @nameZH 業務主要顏色
     * @description 用於特定的業務邏輯標示，例如: '#fa541c'
     */
    colorBusiness: '#fa541c',
    // ========================================================================
    // Seed Tokens (種子變數) - 影響所有其他 Token 的基礎變數
    // ========================================================================

    // 品牌色
    colorPrimary: '#1677ff', // 品牌主色
    colorSuccess: '#52c41a', // 成功色
    colorWarning: '#faad14', // 警戒色
    colorError: '#ff4d4f', // 錯誤色
    colorInfo: '#1677ff', // 資訊色

    // 基礎背景與文字
    colorTextBase: '', // 預設會有 Ant Design 內部值，設定可覆寫
    colorBgBase: '', // 預設會有 Ant Design 內部值，設定可覆寫

    // 字體
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    fontSize: 14, // 基礎字號

    // 線條
    lineWidth: 1, // 基礎線寬
    lineType: 'solid', // 基礎線條樣式

    // 動畫
    motionUnit: 0.1, // 動畫單位時間
    motionBase: 0, // 動畫基礎時間
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',

    // 圓角
    borderRadius: 6, // 基礎圓角

    // 尺寸
    sizeUnit: 4, // 尺寸單位
    sizeStep: 4, // 尺寸步進
    sizePopupArrow: 16, // 彈出框箭頭尺寸

    // 控制項基礎
    controlHeight: 32, // 控制項基礎高度

    // 層級
    zIndexBase: 0, // 基礎 Z-Index
    zIndexPopupBase: 1000, // 彈出框基礎 Z-Index

    // 圖片
    opacityImage: 1, // 圖片透明度

    // 線框風格
    wireframe: false // 是否使用線框風格

    // ========================================================================
    // Map Tokens (映射變數) - 梯度與功能性變數
    // ========================================================================

    // 顏色 - 中性色 (Neutral)
    // colorText: '',             // 一級文本色
    // colorTextSecondary: '',    // 二級文本色
    // colorTextTertiary: '',     // 三級文本色
    // colorTextQuaternary: '',   // 四級文本色
    // colorBorder: '',           // 一級邊框色
    // colorBorderSecondary: '',  // 二級邊框色
    // colorFill: '',             // 一級填充色
    // colorFillSecondary: '',    // 二級填充色
    // colorFillTertiary: '',     // 三級填充色
    // colorFillQuaternary: '',   // 四級填充色
    // colorBgLayout: '',         // 布局背景色
    // colorBgContainer: '',      // 組件容器背景色
    // colorBgElevated: '',       // 浮層容器背景色
    // colorBgSpotlight: '',      // 引起注意的背景色 (Tooltip)
    // colorWhite: '#fff',        // 純白色
    // colorBgMask: '',           // 遮罩顏色

    // 顏色 - 品牌色梯度 (Primary)
    // colorPrimaryBg: '',          // 主色淺色背景
    // colorPrimaryBgHover: '',     // 主色淺色背景懸浮
    // colorPrimaryBorder: '',      // 主色描邊
    // colorPrimaryBorderHover: '', // 主色描邊懸浮
    // colorPrimaryHover: '',       // 主色懸浮
    // colorPrimaryActive: '',      // 主色激活
    // colorPrimaryTextHover: '',   // 主色文本懸浮
    // colorPrimaryText: '',        // 主色文本
    // colorPrimaryTextActive: '',  // 主色文本激活

    // 顏色 - 功能色梯度 (Success, Warning, Error, Info 結構同上)
    // [Success]
    // colorSuccessBg: '',
    // colorSuccessBgHover: '',
    // colorSuccessBorder: '',
    // colorSuccessBorderHover: '',
    // colorSuccessHover: '',
    // colorSuccessActive: '',
    // colorSuccessTextHover: '',
    // colorSuccessText: '',
    // colorSuccessTextActive: '',

    // [Warning]
    // colorWarningBg: '',
    // colorWarningBgHover: '',
    // colorWarningBorder: '',
    // colorWarningBorderHover: '',
    // colorWarningHover: '',
    // colorWarningActive: '',
    // colorWarningTextHover: '',
    // colorWarningText: '',
    // colorWarningTextActive: '',

    // [Error]
    // colorErrorBg: '',
    // colorErrorBgHover: '',
    // colorErrorBorder: '',
    // colorErrorBorderHover: '',
    // colorErrorHover: '',
    // colorErrorActive: '',
    // colorErrorTextHover: '',
    // colorErrorText: '',
    // colorErrorTextActive: '',

    // [Info]
    // colorInfoBg: '',
    // colorInfoBgHover: '',
    // colorInfoBorder: '',
    // colorInfoBorderHover: '',
    // colorInfoHover: '',
    // colorInfoActive: '',
    // colorInfoTextHover: '',
    // colorInfoText: '',
    // colorInfoTextActive: '',

    // 尺寸 (Size)
    // sizeXXL: 48,
    // sizeXL: 32,
    // sizeLG: 24,
    // sizeMD: 20,
    // sizeMS: 16, // compact mode
    // size: 16,   // default
    // sizeSM: 12,
    // sizeXS: 8,
    // sizeXXS: 4,

    // 高度 (Height)
    // controlHeightXS: 16, // 更小
    // controlHeightSM: 24, // 較小
    // controlHeightLG: 40, // 較高

    // 樣式 (Style)
    // lineWidthBold: 2,    // 加粗線寬
    // borderRadiusXS: 2,   // XS 圓角
    // borderRadiusSM: 4,   // SM 圓角
    // borderRadiusLG: 8,   // LG 圓角
    // borderRadiusOuter: 4,// 外部圓角

    // 字體 (Font)
    // fontSizeSM: 12,
    // fontSizeLG: 16,
    // fontSizeXL: 20,
    // fontSizeHeading1: 38,
    // fontSizeHeading2: 30,
    // fontSizeHeading3: 24,
    // fontSizeHeading4: 20,
    // fontSizeHeading5: 16,
    // lineHeight: 1.5714285714285714,
    // lineHeightLG: 1.5,
    // lineHeightSM: 1.6666666666666667,
    // lineHeightHeading1: 1.2105263157894737,
    // lineHeightHeading2: 1.2666666666666666,
    // lineHeightHeading3: 1.3333333333333333,
    // lineHeightHeading4: 1.4,
    // lineHeightHeading5: 1.5,

    // ========================================================================
    // Alias Tokens (別名變數) - 常用元件層級的變數
    // ========================================================================

    // 背景
    // colorFillContentHover: '',
    // colorFillAlter: '',
    // colorFillContent: '',
    // colorBgContainerDisabled: '',
    // colorBgTextHover: '',
    // colorBgTextActive: '',

    // 邊框與分隔
    // colorBorderBg: '',
    // colorSplit: '',       // 分隔線顏色

    // 文本
    // colorTextPlaceholder: '',
    // colorTextDisabled: '',
    // colorTextHeading: '', // 標題文字顏色
    // colorTextLabel: '',   // 標籤文字顏色
    // colorTextDescription: '', // 描述文字顏色
    // colorTextLightSolid: '',

    // 圖示與連結
    // colorIcon: '',
    // colorIconHover: '',
    // colorLink: '',
    // colorLinkHover: '',
    // colorLinkActive: '',

    // 控制項互動
    // controlOutline: '',        // 控制項外框 (Focus)
    // controlOutlineWidth: 2,    // 控制項外框寬度
    // controlItemBgHover: '',    // 選項懸浮背景
    // controlItemBgActive: '',   // 選項激活背景
    // controlItemBgActiveHover: '',
    // controlItemBgActiveDisabled: '',
    // controlInteractiveSize: 16,

    // 間距 (Padding & Margin)
    // paddingXXS: 4,
    // paddingXS: 8,
    // paddingSM: 12,
    // padding: 16,
    // paddingMD: 20,
    // paddingLG: 24,
    // paddingXL: 32,

    // marginXXS: 4,
    // marginXS: 8,
    // marginSM: 12,
    // margin: 16,
    // marginMD: 20,
    // marginLG: 24,
    // marginXL: 32,
    // marginXXL: 48,

    // 其他
    // opacityLoading: 0.65,
    // boxShadow: '',
    // boxShadowSecondary: '',
    // boxShadowTertiary: '',

    // 螢幕斷點 (Screen Breakpoints)
    // screenXS: 480,
    // screenXSMin: 480,
    // screenXSMax: 575,
    // screenSM: 576,
    // screenSMMin: 576,
    // screenSMMax: 767,
    // screenMD: 768,
    // screenMDMin: 768,
    // screenMDMax: 991,
    // screenLG: 992,
    // screenLGMin: 992,
    // screenLGMax: 1199,
    // screenXL: 1200,
    // screenXLMin: 1200,
    // screenXLMax: 1599,
    // screenXXL: 1600,
  }
}
