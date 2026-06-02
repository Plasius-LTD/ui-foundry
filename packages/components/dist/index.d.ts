import React from 'react';

type FoundryStackProps = {
    children?: React.ReactNode;
    gap?: number;
    direction?: "row" | "column";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "space-between";
    className?: string;
};
declare function FoundryStack({ children, gap, direction, align, justify, className, }: FoundryStackProps): React.DetailedReactHTMLElement<{
    className: string | undefined;
    style: {
        display: "flex";
        flexDirection: "row" | "column";
        gap: number;
        alignItems: "center" | "stretch" | "flex-start" | "flex-end";
        justifyContent: "center" | "space-between" | "flex-start" | "flex-end";
    };
}, HTMLElement>;
type FoundryButtonProps = {
    label: string;
    tone?: "neutral" | "primary" | "danger";
    disabled?: boolean;
    onClick?: () => void;
};
declare function FoundryButton({ label, tone, disabled, onClick, }: FoundryButtonProps): React.DetailedReactHTMLElement<{
    type: string;
    disabled: boolean;
    onClick: (() => void) | undefined;
    style: {
        border: number;
        borderRadius: number;
        padding: string;
        fontWeight: number;
        background: string;
        color: string;
        cursor: "not-allowed" | "pointer";
        opacity: number;
    };
}, HTMLElement>;
declare const version = "0.1.0";

export { FoundryButton, type FoundryButtonProps, FoundryStack, type FoundryStackProps, version };
