import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";

const TestPage = () => {
	return (
		<div className="md:w-full whitespace-pre-line">
			<div>
				<Header variant="back" />
			</div>
			{/* <div className="md:w-full flex border border-red-600 mt-5 flex-wrap">
				<div className="bg-auto border border-red-600 m-5 p-5 ">
					<Textarea
						className="max-w-sm"
						placeholder="test textarea placeholder"
					/>
				</div>
				<div className="bg-auto border border-red-600 m-5 p-5">
					<Dialog>
						<DialogTrigger asChild>
							<Button>열기</Button>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>제목</DialogTitle>
								<DialogDescription>설명</DialogDescription>
							</DialogHeader>
							다이얼로그 테스트용 임시 텍스트
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">닫기</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button>확인</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				<div className="bg-auto border border-red-600 m-5 p-5">
					<Button>테스트</Button>
				</div>
			</div> */}
			<div className="md:w-full flex border border-red-600 mt-5 flex-wrap">
				test
			</div>
		</div>
	);
};

export default TestPage;
