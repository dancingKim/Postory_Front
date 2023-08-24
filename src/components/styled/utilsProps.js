import { css } from 'styled-components';
export const stickyBox = css`
  //position: sticky;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  box-shadow: 0 1px ${(p) => p.theme.color.line};
`;

export const contentBox = css`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 0;
  width: ${(p) => p.theme.globalPx.gSiteWidth}px;
`;

export const linkChar = css`
  color: ${(p) => p.theme.color.link};
  font-weight: ${(p) => p.theme.fontWeight.bold};
  font-size: ${(p) => p.theme.fontSize.link}px;
`;

export const bodyChar = css`
  color: ${(p) => p.theme.color.link};
  font-weight: ${(p) => p.theme.fontWeight.semiBold};
  font-size: ${(p) => p.theme.fontSize.bodyfont}px;
`;

export const validGuide = css`
  color: ${(p) => p.theme.color.link};
  font-weight: ${(p) => p.theme.fontWeight.semiBold};
  font-size: ${(p) => p.theme.fontSize.validGuide}px;
`;

export const btnStyle = css`
  padding: 7px 15px;
  font-size: 15px;

  width: fit-content;
  border: 2px solid;
  border-radius: 4px;
`;
