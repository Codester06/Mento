import React from 'react';
import styles from './primary_button.module.css';
import { useNavigate } from 'react-router-dom';

const PrimaryButton = () => {
  const items = [
    {
      id: 1,
      name: 'Talk To Us',
      description: 'Visit our blog for mental health resources and more.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon_primary}>
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg>
      ),
      route: "/"
    },
    {
      id: 2,
      name: 'Blog',
      description: 'Discover best practices for your emotional wellbeing.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon_primary}>
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z"></path>
        </svg>
      ),
      route: '/blogs'
    },
    {
      id: 3,
      name: 'Self-Assessment',
      description: 'Know about your mental state',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className={styles.icon_primary1} viewBox="0 0 256.000000 256.000000">
          <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path d="M835 2145 c-306 -177 -441 -261 -443 -274 -2 -15 81 -67 443 -275 l446 -256 445 258 c359 208 444 261 442 276 -2 13 -132 93 -443 272 -242 139 -442 254 -445 254 -3 0 -203 -115 -445 -255z m557 130 c59 -33 108 -63 108 -66 0 -4 -42 -30 -92 -60 -51 -29 -102 -58 -113 -65 -18 -11 -32 -6 -123 47 -57 32 -108 59 -113 59 -26 0 2 22 104 82 61 36 114 65 117 64 3 0 53 -28 112 -61z m-291 -167 c60 -35 109 -65 109 -68 0 -7 -214 -130 -225 -130 -14 0 -224 124 -219 129 6 6 217 130 222 130 2 1 53 -27 113 -61z m579 0 c60 -35 110 -65 110 -68 0 -3 -51 -34 -112 -69 l-112 -65 -61 34 c-33 19 -86 47 -117 64 -32 17 -58 33 -58 36 1 6 222 129 233 130 4 0 57 -28 117 -62z m-262 -183 c45 -26 82 -50 82 -53 0 -8 -211 -127 -225 -127 -5 0 -61 29 -123 64 l-112 64 117 68 118 68 30 -18 c16 -10 67 -40 113 -66z m570 6 c50 -30 92 -56 92 -60 0 -5 -159 -100 -210 -124 -23 -11 -258 122 -237 134 8 5 61 35 118 68 92 53 106 58 124 47 11 -7 62 -36 113 -65z m-1170 8 c59 -34 108 -63 110 -64 1 -1 -50 -32 -114 -69 l-117 -66 -108 62 c-60 34 -109 65 -109 68 0 7 211 129 223 130 4 0 56 -28 115 -61z m287 -166 c82 -47 112 -69 102 -74 -8 -5 -60 -35 -117 -67 l-102 -59 -114 65 c-63 35 -114 67 -114 71 0 6 208 128 221 130 4 1 59 -29 124 -66z m574 3 c61 -35 112 -67 112 -71 0 -4 -50 -35 -112 -70 l-111 -64 -114 65 c-63 36 -114 69 -114 72 0 6 207 129 221 131 3 1 56 -28 118 -63z m-292 -166 c58 -33 109 -60 114 -60 25 0 -2 -21 -101 -77 -60 -35 -114 -63 -120 -63 -13 0 -229 123 -230 130 0 7 211 129 224 130 5 0 56 -27 113 -60z"></path>
            <path d="M1511 2380 c-19 -11 -9 -45 14 -45 13 0 21 8 23 21 3 23 -17 37 -37 24z"></path>
            <path d="M1610 2315 c-17 -20 -5 -45 20 -45 11 0 23 7 26 15 6 15 -11 45 -26 45 -4 0 -13 -7 -20 -15z"></path>
            <path d="M1711 2251 c-13 -23 10 -47 34 -37 20 7 19 42 -1 50 -22 8 -22 8 -33 -13z"></path>
            <path d="M1823 2203 c-18 -7 -16 -42 3 -50 8 -3 23 1 31 10 13 13 14 19 3 31 -13 17 -17 18 -37 9z"></path>
            <path d="M1920 2134 c-11 -12 -10 -18 3 -31 8 -9 23 -13 31 -10 21 8 21 43 0 51 -21 8 -20 8 -34 -10z"></path>
            <path d="M2024 2076 c-9 -24 4 -48 23 -44 24 4 24 52 0 56 -9 2 -20 -4 -23 -12z"></path>
            <path d="M2130 2015 c-10 -12 -10 -18 0 -30 16 -19 39 -19 46 0 6 15 -11 45 -26 45 -4 0 -13 -7 -20 -15z"></path>
            <path d="M347 1803 c-4 -3 -7 -239 -7 -523 l0 -517 445 -257 c366 -212 448 -256 460 -246 13 11 15 87 15 520 0 394 -3 510 -12 518 -20 16 -879 512 -887 512 -4 0 -11 -3 -14 -7z m171 -143 l112 -65 0 -132 c0 -73 -3 -133 -8 -133 -4 0 -57 29 -117 64 l-110 64 -3 137 c-1 75 1 135 6 133 4 -1 58 -32 120 -68z m285 -165 l106 -60 3 -138 c2 -75 1 -137 -1 -137 -2 0 -55 30 -117 66 l-114 66 0 135 c0 75 4 133 9 131 5 -1 56 -30 114 -63z m397 -369 l0 -138 -22 14 c-13 9 -65 39 -115 68 l-93 52 0 138 0 139 115 -67 115 -67 0 -139z m-685 198 l115 -67 0 -134 c0 -74 -4 -133 -8 -131 -4 2 -58 32 -120 68 l-112 65 0 133 c0 72 2 132 5 132 3 0 57 -30 120 -66z m397 -367 c2 -75 3 -137 2 -137 0 0 -49 29 -109 65 -60 36 -113 65 -117 65 -5 0 -8 63 -8 139 l0 140 114 -67 115 -67 3 -138z m-399 34 c60 -35 111 -69 113 -76 3 -6 3 -66 2 -132 l-3 -121 -115 67 -115 67 -3 133 c-1 73 1 131 5 129 4 -1 57 -32 116 -67z m595 -11 l92 -52 0 -134 c0 -74 -2 -134 -4 -134 -2 0 -52 28 -112 63 l-109 63 -3 139 -3 138 23 -15 c13 -8 65 -39 116 -68z m-310 -155 l111 -66 3 -129 c2 -72 1 -130 -2 -130 -3 0 -54 29 -115 64 l-110 64 -3 131 c-1 72 -1 131 2 131 2 0 54 -29 114 -65z m292 -168 l105 -63 3 -133 3 -134 -23 15 c-13 8 -65 39 -115 68 l-93 52 0 129 c0 71 3 129 8 129 4 -1 54 -29 112 -63z"></path>
            <path d="M1753 1557 c-237 -139 -434 -255 -438 -258 -10 -11 -6 -1032 4 -1042 6 -6 178 88 455 248 l446 258 -2 521 c-3 454 -5 521 -18 522 -8 1 -209 -111 -447 -249z m417 39 l0 -135 -111 -65 c-61 -36 -114 -66 -118 -66 -3 0 -5 60 -4 132 l2 133 28 18 c61 39 188 115 196 116 4 1 7 -59 7 -133z m-290 -170 l0 -134 -77 -45 c-43 -25 -95 -55 -115 -67 l-38 -22 0 139 1 138 107 62 c59 33 110 61 115 62 4 1 7 -59 7 -133z m-290 -165 l0 -139 -92 -52 c-51 -29 -103 -59 -115 -68 l-23 -14 0 138 0 139 113 66 c61 37 113 67 115 68 1 1 2 -61 2 -138z m580 -4 l0 -133 -112 -64 c-62 -36 -115 -66 -118 -68 -3 -1 -4 59 -4 134 l2 135 108 64 c60 35 112 64 117 64 4 1 7 -59 7 -132z m-297 -304 c-4 -2 -56 -32 -115 -67 l-108 -64 0 136 0 137 113 65 112 65 3 -135 c1 -74 -1 -136 -5 -137z m-287 -158 c-3 -9 -210 -135 -222 -135 -2 0 -4 60 -4 133 l0 133 113 66 112 66 3 -126 c1 -69 1 -131 -2 -137z m584 133 l-1 -133 -109 -62 c-61 -35 -114 -63 -118 -63 -4 0 -6 57 -6 127 l1 128 114 67 c63 37 115 68 117 68 1 0 2 -60 2 -132z m-290 -167 l0 -130 -111 -65 c-61 -36 -113 -66 -115 -66 -2 0 -4 58 -4 129 l0 130 108 64 c59 36 110 66 115 66 4 1 7 -57 7 -128z m-290 -170 l0 -129 -92 -53 c-51 -29 -103 -59 -116 -67 l-23 -15 3 134 3 133 105 62 c58 34 108 63 113 63 4 1 7 -57 7 -128z"></path>
          </g>
        </svg>
      ),
      route: '/self-assessment-tool'
    },
  ];
  
  const navigate = useNavigate();

  return (
    <div className={styles.container_primary}>
      <div className={styles.glassBubble1}></div>
      <div className={styles.glassBubble2}></div>
      
      {items.map((item) => (
        <div key={item.id} className={styles.buttons} onClick={() => navigate(item.route)}>
          <div className={styles.svgBackground}>
            {item.icon}
          </div>
          <h1 className={styles.title_primary}>{item.name}</h1>
          <p className={styles.description_primary}>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PrimaryButton;