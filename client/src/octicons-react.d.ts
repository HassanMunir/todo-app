declare module "@primer/octicons-react" {
  import { FC, SVGAttributes } from "react";
  export interface IconProps extends SVGAttributes<SVGElement> {
    size?: number;
  }
  export const CheckCircleFillIcon: FC<IconProps>;
}
