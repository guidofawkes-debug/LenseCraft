declare module 'react-csv' {
  import { ComponentType } from 'react';

  export interface CSVProps {
    data: Array<any>;
    headers?: Array<any>;
    enclosingCharacter?: string;
    separator?: string;
    filename?: string;
    uFEFF?: boolean;
    target?: string;
    onClick?: () => void;
    asyncOnClick?: boolean;
  }

  export const CSVLink: ComponentType<CSVProps & React.HTMLProps<HTMLAnchorElement>>;
  export const CSVDownload: ComponentType<CSVProps>;
}