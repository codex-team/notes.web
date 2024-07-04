<template>
  <svg
    v-if="name === 'DarkTheme'"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_630_1752)">
      <rect
        width="30"
        height="30"
        fill="url(#paint0_linear_630_1752)"
      />
      <circle
        cx="15"
        cy="15"
        r="10"
        fill="#7B32C5"
        fill-opacity="0.25"
      />
      <mask
        id="mask0_630_1752"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="8"
        y="8"
        width="14"
        height="14"
      >
        <circle
          cx="15"
          cy="15"
          r="7"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_630_1752)">
        <circle
          cx="15"
          cy="15"
          r="7"
          fill="url(#paint1_radial_630_1752)"
        />
        <circle
          cx="9"
          cy="16"
          r="2"
          fill="#8F4D9F"
        />
        <circle
          cx="18.5"
          cy="13.5"
          r="1.5"
          fill="#B877C8"
        />
        <circle
          cx="17.5"
          cy="19.5"
          r="2.5"
          fill="#9259A0"
        />
        <circle
          cx="11.5"
          cy="8.5"
          r="1.5"
          fill="#935FA0"
        />
      </g>
      <circle
        cx="24"
        cy="6"
        r="1"
        fill="#C317FF"
      />
      <circle
        cx="25.5"
        cy="24.5"
        r="0.5"
        fill="white"
      />
      <circle
        cx="5.5"
        cy="22.5"
        r="0.5"
        fill="white"
      />
      <circle
        cx="6.5"
        cy="5.5"
        r="0.5"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_630_1752"
        x1="15"
        y1="0"
        x2="15"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#1A1333" />
        <stop
          offset="1"
          stop-color="#371563"
        />
      </linearGradient>
      <radialGradient
        id="paint1_radial_630_1752"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(18 12) rotate(124.38) scale(11.5109)"
      >
        <stop stop-color="#DDBBFF" />
        <stop
          offset="1"
          stop-color="#8A539D"
        />
      </radialGradient>
      <clipPath id="clip0_630_1752">
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>

  <svg
    v-if="name === 'LightTheme'"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_630_1779)">
      <rect
        width="30"
        height="30"
        fill="url(#paint0_radial_630_1779)"
      />
      <circle
        cx="15"
        cy="15"
        r="10"
        fill="#FFDB7F"
        fill-opacity="0.26"
      />
      <circle
        cx="15"
        cy="15"
        r="7"
        fill="url(#paint1_radial_630_1779)"
      />
      <path
        d="M26 32C30.6944 32 35 26.1944 35 21.5C35 16.8056 31.1944 13 26.5 13C23.0932 13 20.1545 15.0043 18.7987 17.898C17.8317 17.3274 16.7041 17 15.5 17C12.523 17 10.0134 19.0013 9.24335 21.732C8.43588 21.2664 7.49905 21 6.5 21C3.46243 21 1 23.4624 1 26.5C1 29.5376 3.46243 32 6.5 32C10.6073 32 14.3278 32 18.5 32C22.9326 32 21.3583 32 26 32Z"
        fill="white"
        fill-opacity="0.73"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_630_1779"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(15 15) rotate(-90) scale(14.5)"
      >
        <stop stop-color="#CAF5FF" />
        <stop
          offset="1"
          stop-color="#277DFF"
        />
      </radialGradient>
      <radialGradient
        id="paint1_radial_630_1779"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(18 12) rotate(124.38) scale(11.5109)"
      >
        <stop stop-color="white" />
        <stop
          offset="1"
          stop-color="#FFCE1F"
        />
      </radialGradient>
      <clipPath id="clip0_630_1779">
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>

  <svg
    v-if="name === 'SystemTheme'"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_630_1795)">
      <rect
        width="30"
        height="30"
        fill="url(#paint0_linear_630_1795)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28.5 37C33.1944 37 37 33.1944 37 28.5C37 23.8056 33.1944 20 28.5 20C25.0932 20 22.1545 22.0043 20.7987 24.898C19.8317 24.3274 18.7041 24 17.5 24C14.523 24 12.0134 26.0013 11.2434 28.732C10.4359 28.2664 9.49905 28 8.5 28C5.46243 28 3 30.4624 3 33.5C3 36.5376 5.46243 39 8.5 39C10.7679 39 12.7152 37.6273 13.5564 35.6675C14.6502 36.5034 16.0171 37 17.5 37C19.5445 37 21.3686 36.056 22.5602 34.5802C24.0925 36.0773 26.1885 37 28.5 37Z"
        fill="white"
        fill-opacity="0.27"
      />
      <circle
        cx="24"
        cy="6"
        r="1"
        fill="#0C7CFF"
      />
      <circle
        cx="25.5"
        cy="24.5"
        r="0.5"
        fill="white"
      />
      <circle
        cx="5.5"
        cy="22.5"
        r="0.5"
        fill="white"
      />
      <circle
        cx="6.5"
        cy="5.5"
        r="0.5"
        fill="white"
      />
      <circle
        cx="15"
        cy="15"
        r="9"
        fill="white"
        fill-opacity="0.12"
      />
      <mask
        id="mask0_630_1795"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="8"
        y="8"
        width="14"
        height="14"
      >
        <circle
          cx="15"
          cy="15"
          r="7"
          fill="url(#paint1_radial_630_1795)"
        />
      </mask>
      <g mask="url(#mask0_630_1795)">
        <circle
          cx="15"
          cy="15"
          r="7"
          fill="url(#paint2_radial_630_1795)"
        />
        <circle
          cx="19"
          cy="15"
          r="7"
          fill="black"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_630_1795"
        x1="15"
        y1="0"
        x2="15"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#1F1828" />
        <stop
          offset="1"
          stop-color="#256DD8"
        />
      </linearGradient>
      <radialGradient
        id="paint1_radial_630_1795"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(18 12) rotate(124.38) scale(11.5109)"
      >
        <stop stop-color="white" />
        <stop
          offset="1"
          stop-color="#FFE178"
        />
      </radialGradient>
      <radialGradient
        id="paint2_radial_630_1795"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(18 12) rotate(124.38) scale(11.5109)"
      >
        <stop stop-color="white" />
        <stop
          offset="1"
          stop-color="#FFE178"
        />
      </radialGradient>
      <clipPath id="clip0_630_1795">
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0H22C26.4183 0 30 3.58172 30 8V22C30 26.4183 26.4183 30 22 30H8C3.58172 30 0 26.4183 0 22V8Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
  <svg
    v-if="name === 'Hammer'"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_630_2009)">
      <rect
        width="30"
        height="30"
        fill="url(#paint0_linear_630_2009)"
      />
      <path
        d="M10.8955 7.95445C12.5974 6.25256 13.4483 5.40161 14.5052 5.40161C15.563 5.40161 16.4139 6.25256 18.1148 7.95445L22.448 12.2866C24.1489 13.9876 24.9999 14.8385 24.9999 15.8963C24.9999 16.9531 24.1489 17.8041 22.447 19.506C20.7451 21.2079 19.8942 22.0588 18.8373 22.0588C17.7795 22.0588 16.9286 21.2079 15.2277 19.506L10.8945 15.1738C9.19458 13.4729 8.34265 12.6219 8.34265 11.5641C8.34265 10.5073 9.1936 9.65635 10.8955 7.95445Z"
        fill="url(#paint1_linear_630_2009)"
      />
      <path
        opacity="0.5"
        d="M11.6216 15.9011L6.21006 21.3107C5.87478 21.647 5.70713 21.8146 5.60616 21.9891C5.47176 22.2219 5.401 22.486 5.401 22.7548C5.401 23.0236 5.47176 23.2877 5.60616 23.5205C5.70713 23.695 5.87478 23.8636 6.21104 24.1989C6.54632 24.5341 6.71396 24.7028 6.88944 24.8037C7.12223 24.9381 7.3863 25.0089 7.6551 25.0089C7.9239 25.0089 8.18797 24.9381 8.42076 24.8037C8.59526 24.7028 8.76388 24.5341 9.09916 24.1989L14.5088 18.7883L11.6216 15.9011ZM21.7291 11.568L22.0947 11.2033C22.43 10.867 22.5986 10.6994 22.6996 10.5249C22.834 10.2921 22.9048 10.028 22.9048 9.75922C22.9048 9.49042 22.834 9.22636 22.6996 8.99357C22.5986 8.81808 22.43 8.65044 22.0947 8.31516C21.7595 7.9789 21.5908 7.81126 21.4163 7.71028C21.1835 7.57588 20.9195 7.50513 20.6507 7.50513C20.3819 7.50513 20.1178 7.57588 19.885 7.71028C19.7105 7.81126 19.5419 7.9789 19.2066 8.31516L18.8409 8.68083L21.7291 11.568Z"
        fill="#10020A"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_630_2009"
        x1="15"
        y1="0"
        x2="15"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#A44CEA" />
        <stop
          offset="1"
          stop-color="#E63E7A"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_630_2009"
        x1="16.6713"
        y1="5.40161"
        x2="16.6713"
        y2="22.0588"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop
          offset="1"
          stop-color="#F0A9E0"
        />
      </linearGradient>
      <clipPath id="clip0_630_2009">
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H26C28.2091 0 30 1.79086 30 4V26C30 28.2091 28.2091 30 26 30H4C1.79086 30 0 28.2091 0 26V4Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  /**
   * Name of the picture to be displayed
   */
  name: string;
}>();

</script>

<style lang="postcss" module></style>
