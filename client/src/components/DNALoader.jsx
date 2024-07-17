import React from 'react';

const DEFAULT_WAI_ARIA_ATTRIBUTE = {
  'aria-busy': true,
  role: 'progressbar',
};

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const DNALoader = ({
  visible = true,
  width = '80',
  height = '80',
  wrapperClass = '',
  wrapperStyle = {},
  ariaLabel = 'dna-loading',
}) => {
  return !visible ? null : (
    <div className='flex items-center justify-center h-[100vh]'>
    <svg
      xmlns={SVG_NAMESPACE}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={wrapperClass}
      style={wrapperStyle}
      aria-label={ariaLabel}
      data-testid="dna-svg"
      {...DEFAULT_WAI_ARIA_ATTRIBUTE}
    >
      <circle
        cx="6.451612903225806"
        cy="60.6229"
        r="3.41988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.5s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.5s"
        />
      </circle>
      <circle cx="6.451612903225806" cy="39.3771" r="2.58012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.5s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.5s"
        />
      </circle>
      <circle
        cx="16.129032258064512"
        cy="68.1552"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.7s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.2s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.7s"
        />
      </circle>
      <circle cx="16.129032258064512" cy="31.8448" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.7s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.2s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.7s"
        />
      </circle>
      <circle
        cx="25.806451612903224"
        cy="69.3634"
        r="2.93988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.9s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.4s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.9s"
        />
      </circle>
      <circle cx="25.806451612903224" cy="30.6366" r="3.06012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.9s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.4s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.9s"
        />
      </circle>
      <circle
        cx="35.483870967741936"
        cy="62.3446"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.1s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.6s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.1s"
        />
      </circle>
      <circle cx="35.483870967741936" cy="37.6554" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.1s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.6s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.1s"
        />
      </circle>
      <circle
        cx="45.16129032258064"
        cy="55.2438"
        r="2.93988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.3s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.8s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.3s"
        />
      </circle>
      <circle cx="45.16129032258064" cy="44.7562" r="3.06012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.3s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.8s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.3s"
        />
      </circle>
      <circle
        cx="54.83870967741935"
        cy="60.9031"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.5s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.5s"
        />
      </circle>
      <circle cx="54.83870967741935" cy="39.0969" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.5s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-2s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.5s"
        />
      </circle>
      <circle
        cx="64.51612903225806"
        cy="62.3446"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.7s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.2s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.7s"
        />
      </circle>
      <circle cx="64.51612903225806" cy="37.6554" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.7s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.2s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.7s"
        />
      </circle>
      <circle
        cx="74.19354838709677"
        cy="58.1244"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.9s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.4s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.9s"
        />
      </circle>
      <circle cx="74.19354838709677" cy="41.8756" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.9s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.4s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.9s"
        />
      </circle>
      <circle
        cx="83.87096774193549"
        cy="52.8741"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.1s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.6s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.1s"
        />
      </circle>
      <circle cx="83.87096774193549" cy="47.1259" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-3.1s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.6s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.1s"
        />
      </circle>
      <circle
        cx="93.54838709677419"
        cy="49.7213"
        r="3.17988"
        fill="rgba(233, 12, 89, 0.5125806451612902)"
      >
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.3s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-1.8s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="rgba(233, 12, 89, 0.5125806451612902);#ff0033;rgba(233, 12, 89, 0.5125806451612902)"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.3s"
        />
      </circle>
      <circle cx="93.54838709677419" cy="50.2787" r="2.82012" fill="#46dff0">
        <animate
          attributeName="r"
          keyTimes="0;0.5;1"
          values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
          dur="2s"
          repeatCount="indefinite"
          begin="-3.3s"
        />
        <animate
          attributeName="cy"
          keyTimes="0;0.5;1"
          values="30.5;69.5;30.5"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.8s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        />
        <animate
          attributeName="fill"
          keyTimes="0;0.5;1"
          values="#46dff0;rgba(53, 58, 57, 0.1435483870967742);#46dff0"
          dur="2s"
          repeatCount="indefinite"
          begin="-2.3s"
        />
      </circle>
    </svg>
    </div>
  )
}

export default DNALoader;