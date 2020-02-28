import * as React from 'react';

interface IProps {
  width?: string | number | boolean
  height?: string | number
  style?: React.CSSProperties
}

/**
 * @description 占用空间用
 * @param {IProps} { width, height, dashed, divider, style }
 */
const SpaceBetween: React.SFC<IProps> = ({ width, height, style }: IProps) => {
  if (width) {
    return (
      <div style={{ display: 'inline-block', width: `${width === true ? '0.8rem' : width}`, ...style }}>
        &nbsp;
      </div>
    );
  } else {
    return <div style={{ height: `${height || '0.8rem'}`, ...style }}>&nbsp;</div>;
  }
}

export default SpaceBetween;
