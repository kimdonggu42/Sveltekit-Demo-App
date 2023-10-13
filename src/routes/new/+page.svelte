<script>
	import backspaceIcon from '../../lib/icons/keyboard_backspace.svg';
	import closeIcon from '../../lib/icons/close.svg';
</script>

<div class="w-[800px] h-[600px] border border-solid border-[#848484] rounded-xl">
	<header class="flex items-center h-[75px] bg-white rounded-t-xl">
		<div class="basis-[30%] pl-[20px]">
			<button class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
				><img src={backspaceIcon} alt="backspace_icon" />
			</button>
		</div>
		<div class="flex justify-center basis-[40%]">
			<div class="text-[25px] text-[#6b6460]">New Reservation</div>
		</div>
		<div class="flex items-center justify-end basis-[30%] pr-[20px] text-righ">
			<button>
				<img src={closeIcon} alt="close_icon" />
			</button>
		</div>
	</header>
	<div class="bg-white h-[calc(100%-75px)] rounded-b-xl">new reservation page</div>
</div>
