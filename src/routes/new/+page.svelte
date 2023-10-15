<script>
	import backspaceIcon from '../../lib/icons/keyboard_backspace.svg';
	import closeIcon from '../../lib/icons/close.svg';
	import eventIcon from '../../lib/icons/event_available.svg';
	import minusIcon from '../../lib/icons/math-minus.svg';
	import plusIcon from '../../lib/icons/math-plus.svg';
	import { goto } from '$app/navigation';
	import { reservationsStore } from '../../stores/reservations';

	let reservations;

	reservationsStore.subscribe((value) => {
		reservations = value;
	});

	let name = '';
	let phone = '';
	let guests = 0;
	let selectTable = [];
	let note = '';
	let selectTableModalOpen = false;

	const tableList = ['Table 7 ⋅ Floor 1', 'Table 8 ⋅ Floor 1'];

	const addNewReservation = async () => {
		const newReservation = {
			id: reservations.length,
			name,
			phone,
			date: 'test',
			hour: 'test',
			minute: 'test',
			meridiem: 'test',
			guests,
			table: selectTable,
			note,
			seated: false
		};
		await reservationsStore.postReservation(newReservation);
		goto('/');
	};

	const decrementGuests = () => {
		if (guests > 0) {
			guests = guests - 1;
		}
	};

	const incrementGuests = () => {
		guests = guests + 1;
	};

	const addTable = (value) => {
		if (!selectTable.includes(value)) {
			selectTable = [...selectTable, value];
		} else {
			alert('이미 선택한 테이블입니다.');
		}
	};

	const openSelectTable = () => {
		selectTableModalOpen = selectTableModalOpen ? false : true;
	};

	const handleKeyDownOpenTableList = (e) => {
		if (e.key === 'Enter') {
			openSelectTable();
		}
	};

	const handleKeyDownSelectTable = (e) => {
		if (e.key === 'Enter') {
			addTable(table);
		}
	};

	const movePrevPage = () => {
		goto('/');
	};
</script>

<div class="w-[800px] h-[600px] border border-solid border-[#848484] rounded-xl">
	<header class="flex items-center h-[75px] bg-white rounded-t-xl">
		<div class="basis-[30%] pl-[20px]">
			<button class="p-[5px] bg-[#f7f7f5] rounded-lg shadow-lg" on:click={movePrevPage}
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
	<div
		class="flex flex-col justify-between bg-white h-[calc(100%-75px)] px-[30px] py-[20px] rounded-b-xl"
	>
		<div class="flex flex-col gap-y-[30px]">
			<div class="flex items-center gap-x-[20px]">
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Name"
					bind:value={name}
				/>
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Phone"
					bind:value={phone}
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
					<button class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg" on:click={decrementGuests}>
						<img src={minusIcon} alt="minus_icon" />
					</button>
					<div class="text-[25px] w-[60px] text-center">{guests}</div>
					<button class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg" on:click={incrementGuests}>
						<img src={plusIcon} alt="plus_icon" />
					</button>
				</div>

				<div class="w-6/12">
					<div
						class="flex items-center px-[20px] h-full relative border border-solid border-[#b1aaa8] rounded-lg"
						on:click={openSelectTable}
						on:keydown={handleKeyDownOpenTableList}
						role="button"
						tabindex="0"
					>
						<ul class="flex gap-x-[10px]">
							{#if selectTable.length === 0}
								<div class="text-[#a7a7a7]">Select Table</div>
							{/if}
							{#each selectTable as table}
								<li>{table}</li>
							{/each}
						</ul>
						{#if selectTableModalOpen}
							<div
								class="w-full absolute top-[100%] left-0 border border-solid border-[#b1aaa8] rounded-lg"
							>
								{#each tableList as table}
									<div
										class="p-[20px] relative bg-white rounded-lg hover:bg-slate-100"
										on:click={() => addTable(table)}
										on:keydown={handleKeyDownSelectTable}
										role="button"
										tabindex="0"
									>
										{table}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
			<textarea
				class="p-[20px] border border-solid border-[#b1aaa8] rounded-lg shadow-lg resize-none"
				rows="7"
				placeholder="Add Note..."
				bind:value={note}
			/>
		</div>
		<button
			type="submit"
			class="text-white py-[20px] bg-primary rounded-lg"
			on:click={addNewReservation}
		>
			Save
		</button>
	</div>
</div>
