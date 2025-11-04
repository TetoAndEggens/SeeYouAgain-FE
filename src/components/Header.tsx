"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, ChevronLeft, X } from "lucide-react";

type Variant = "default" | "back" | "close";

interface HeaderProps {
	title?: string;
	variant?: Variant;
	onTitle?: () => void;
	onBack?: () => void;
	onClose?: () => void;
	onBell?: () => void;
	onMenu?: () => void;
}

interface Action {
	key: string;
	ariaLabel: string;
	onClick?: () => void;
	icon: React.ReactNode;
}

export function Header({
	title = "SeeYouAgain",
	variant = "default",
	onTitle,
	onBack,
	onClose,
	onBell,
	onMenu,
}: HeaderProps) {
	const router = useRouter();

	const onDefault = {
		title: () => router.push("/"),
		back: () => router.back(),
		close: () => window.history.back(),
		bell: () => console.log("bell 클릭"),
		menu: () => console.log("menu 클릭"),
	};

	const iconConfig: Record<
		Variant,
		{ leftIcons: Action[]; rightIcons: Action[] }
	> = {
		default: {
			leftIcons: [],
			rightIcons: [
				{
					key: "bell",
					ariaLabel: "알림",
					onClick: onBell ?? onDefault.bell,
					icon: <Bell size={24} />,
				},
				{
					key: "menu",
					ariaLabel: "메뉴",
					onClick: onMenu ?? onDefault.menu,
					icon: <Menu size={24} />,
				},
			],
		},
		back: {
			leftIcons: [
				{
					key: "back",
					ariaLabel: "뒤로가기",
					onClick: onBack ?? onDefault.back,
					icon: <ChevronLeft size={24} />,
				},
			],
			rightIcons: [
				{
					key: "bell",
					ariaLabel: "알림",
					onClick: onBell ?? onDefault.bell,
					icon: <Bell size={24} />,
				},
				{
					key: "menu",
					ariaLabel: "메뉴",
					onClick: onMenu ?? onDefault.menu,
					icon: <Menu size={24} />,
				},
			],
		},
		close: {
			leftIcons: [
				{
					key: "close",
					ariaLabel: "닫기",
					onClick: onClose ?? onDefault.close,
					icon: <X size={24} />,
				},
			],
			rightIcons: [],
		},
	};

	const { leftIcons, rightIcons } = iconConfig[variant];

	return (
		<div className="w-dvw bg-auto flex justify-between p-4 items-center border-b border-gray-600 z-10">
			<div className="w-36 bg-auto flex justify-between items-center">
				{leftIcons.map((item) => (
					<button
						key={item.key}
						aria-label={item.ariaLabel}
						onClick={item.onClick ?? (() => {})}
					>
						{item.icon}
					</button>
				))}
				<button onClick={onTitle ?? onDefault.title}>
					<p className="text-lg font-bold">{title}</p>
				</button>
			</div>
			<div className="w-24 bg-auto flex justify-between p-2 pt-0 pb-0 items-center">
				{rightIcons.map((item) => (
					<button
						key={item.key}
						aria-label={item.ariaLabel}
						onClick={item.onClick ?? (() => {})}
					>
						{item.icon}
					</button>
				))}
			</div>
		</div>
	);
}
