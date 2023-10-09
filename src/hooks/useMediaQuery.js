import { useMediaQuery } from "react-responsive";

export const useLargeDekstopQuery = () =>
  useMediaQuery({
    query: "(min-width: 1400px)",
  });
export const useDekstopQuery = () =>
  useMediaQuery({
    query: "(min-width: 1200px)",
  });

export const useLaptopQuery = () =>
  useMediaQuery({
    query: "(min-width: 992px)",
  });

export const useTabletQuery = () =>
  useMediaQuery({
    query: "(min-width: 768px)",
  });

export const useMobileQuery = () =>
  useMediaQuery({
    query: "(min-width: 576px)",
  });

export const useSmallMobileQuery = () =>
  useMediaQuery({
    query: "(min-width: 300px)",
  });

export const useMediaResponsive = {
  largerDekstop: () =>
    useMediaQuery({
      query: "(min-width: 1400px)",
    }),
  dekstop: () =>
    useMediaQuery({
      query: "(min-width: 1200px)",
    }),
  laptop: () =>
    useMediaQuery({
      query: "(min-width: 992px)",
    }),
  tablet: () =>
    useMediaQuery({
      query: "(min-width: 768px)",
    }),
  mobile: () =>
    useMediaQuery({
      query: "(min-width: 576px)",
    }),
  smallMobile: () =>
    useMediaQuery({
      query: "(min-width: 340px)",
    }),
};
