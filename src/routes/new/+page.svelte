<script>
	import backspaceIcon from '../../lib/icons/keyboard_backspace.svg';
	import closeIcon from '../../lib/icons/close.svg';
	import eventIcon from '../../lib/icons/event_available.svg';
	import minusIcon from '../../lib/icons/math-minus.svg';
	import plusIcon from '../../lib/icons/math-plus.svg';
</script>

<div class="w-[800px] h-[600px] border border-solid border-[#848484] rounded-xl">
	<header class="flex items-center h-[75px] bg-white rounded-t-xl">
		<div class="basis-[30%] pl-[20px]">
			<button class="p-[5px] bg-[#f7f7f5] rounded-lg shadow-lg"
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
	<form
		class="flex flex-col justify-between bg-white h-[calc(100%-75px)] px-[30px] py-[20px] rounded-b-xl"
	>
		<div class="flex flex-col gap-y-[30px]">
			<div class="flex items-center gap-x-[20px]">
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Name"
				/>
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Phone"
				/>
				<button
					class="flex justify-center w-full gap-x-[5px] p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
				>
					<img src={eventIcon} alt="event_icon" />
					<div class="text-[#6b6460]">Select Date</div>
				</button>
			</div>
			<div class="flex">
				<div class="flex items-center w-6/12">
					<div class="text-[#6b6460] mr-[20px]">Guests</div>
					<button class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
						><img src={minusIcon} alt="minus_icon" />
					</button>
					<div class="text-[25px] w-[60px] text-center">0</div>
					<button class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
						><img src={plusIcon} alt="plus_icon" />
					</button>
				</div>
				<div class="w-6/12">
					<select>
						<option value="javascript">Table7 ⋅ Floor 1</option>
						<option value="typescript">Table8 ⋅ Floor 1</option>
					</select>
				</div>
			</div>
			<textarea
				class="p-[20px] border border-solid border-[#b1aaa8] rounded-lg shadow-lg resize-none"
				rows="7"
				placeholder="Add Note..."
			/>
		</div>
		<button type="submit" class="text-white py-[20px] bg-primary rounded-lg">Save </button>
	</form>
</div>
