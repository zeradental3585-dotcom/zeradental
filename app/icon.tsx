import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1F33',
          borderRadius: 14,
        }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
          <path
            d="M7.2 3.4C5 3.4 3.6 5.1 3.6 7.6c0 2 .5 3.3.9 5 .3 1.3.4 2.3.5 3.9.1 1.7.4 3.1.9 4 .4.7 1 1.1 1.6 1.1.9 0 1.4-.7 1.7-2 .3-1.2.4-2.6.7-3.7.2-.9.6-1.5 1.1-1.5s.9.6 1.1 1.5c.3 1.1.4 2.5.7 3.7.3 1.3.8 2 1.7 2 .6 0 1.2-.4 1.6-1.1.5-.9.8-2.3.9-4 .1-1.6.2-2.6.5-3.9.4-1.7.9-3 .9-5 0-2.5-1.4-4.2-3.6-4.2-1.4 0-2.3.5-3.8.5s-2.4-.5-3.8-.5Z"
            stroke="#A7EBDA"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
