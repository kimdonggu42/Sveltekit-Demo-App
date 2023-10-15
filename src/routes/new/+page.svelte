<script>
	import { goto } from '$app/navigation';
	import { reservationsStore } from '../../stores/reservations';
	import {
		name,
		phone,
		guests,
		tables,
		note,
		date,
		hour,
		minute,
		meridiem
	} from '../../stores/reservationData';
	import backspaceIcon from '../../lib/icons/keyboard_backspace.svg';
	import closeIcon from '../../lib/icons/close.svg';
	import eventIcon from '../../lib/icons/event_available.svg';
	import minusIcon from '../../lib/icons/math-minus.svg';
	import plusIcon from '../../lib/icons/math-plus.svg';
	import arrowDropDown from '../../lib/icons/arrow_drop_down.svg';

	let nameValue;
	let phoneValue;
	let guestsValue;
	let tablesValue;
	let noteValue;

	let dateValue;
	let hourValue;
	let minuteValue;
	let meridiemValue;

	let selectTable = [];

	name.subscribe((value) => {
		nameValue = value;
	});

	phone.subscribe((value) => {
		phoneValue = value;
	});

	guests.subscribe((value) => {
		guestsValue = value;
	});

	tables.subscribe((value) => {
		tablesValue = value;
	});

	note.subscribe((value) => {
		noteValue = value;
	});

	date.subscribe((value) => {
		dateValue = value;
	});

	hour.subscribe((value) => {
		hourValue = value;
	});

	minute.subscribe((value) => {
		minuteValue = value;
	});

	meridiem.subscribe((value) => {
		meridiemValue = value;
	});

	let selectTableModalOpen = false;

	const tableList = ['Table 7 ⋅ Floor 1', 'Table 8 ⋅ Floor 1'];

	const addNewReservation = async (e) => {
		const newReservation = {
			id: Math.floor(Math.random() * 100000000) + 1,
			name: nameValue,
			phone: phoneValue,
			date: dateValue,
			hour: hourValue,
			minute: minuteValue,
			meridiem: meridiemValue,
			guests: guestsValue,
			table: tablesValue,
			note: noteValue,
			seated: false
		};
		e.preventDefault();
		await reservationsStore.postReservation(newReservation);
		name.set('');
		phone.set('');
		guests.set(0);
		tables.set([]);
		note.set('');
		date.set('');
		hour.set(1);
		minute.set(0);
		meridiem.set('AM');
		goto('/');
	};

	const changeName = (e) => {
		name.set(e.target.value);
	};

	const changePhone = (e) => {
		phone.set(e.target.value);
	};

	const changeNote = (e) => {
		note.set(e.target.value);
	};

	const decrementGuests = () => {
		if (guestsValue > 0) {
			guests.update((guest) => guest - 1);
		}
	};

	const incrementGuests = () => {
		guests.update((guest) => guest + 1);
	};

	const addTable = (value) => {
		if (!tablesValue.includes(value)) {
			tables.set([...tablesValue, value]);
		} else {
			alert('이미 선택한 테이블입니다.');
		}
	};

	const removeTable = (e, tableIndex) => {
		e.stopPropagation();
		const filteringTablesValue = tablesValue.filter((value) => value !== tablesValue[tableIndex]);
		tables.set(filteringTablesValue);
	};

	const openSelectTable = () => {
		selectTableModalOpen = selectTableModalOpen ? false : true;
	};

	const handleKeyDownSelectTable = (e) => {
		if (e.key === 'Enter') {
			addTable(selectTable);
		}
	};

	const moveSelectDatePage = () => {
		goto('/date');
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
	<form
		class="flex flex-col justify-between bg-white h-[calc(100%-75px)] px-[30px] py-[20px] rounded-b-xl"
		on:submit={addNewReservation}
	>
		<div class="flex flex-col gap-y-[30px]">
			<div class="flex items-center gap-x-[20px]">
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Name*"
					bind:value={nameValue}
					on:input={changeName}
					required
				/>
				<input
					class="w-full min-h-[50px] px-[20px] border border-solid border-[#b1aaa8] rounded-lg"
					type="text"
					placeholder="Phone*"
					bind:value={phoneValue}
					on:input={changePhone}
					required
				/>
				<button
					class="flex justify-center w-full gap-x-[5px] p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
					type="button"
					on:click={moveSelectDatePage}
				>
					<img src={eventIcon} alt="event_icon" />
					{#if dateValue === ''}
						<div class="text-[#6b6460]">Select Date</div>
					{:else}
						<div class="flex text-[#6b6460]">
							<div>
								{dateValue},&nbsp;
							</div>
							<div>
								{hourValue}:
							</div>
							<div>
								{String(minuteValue).padStart(2, '0')}&nbsp;
							</div>
							<div>
								{meridiemValue}
							</div>
						</div>
					{/if}
				</button>
			</div>
			<div class="flex">
				<div class="flex items-center w-6/12">
					<div class="text-[#6b6460] mr-[20px]">Guests</div>
					<button
						class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
						on:click={decrementGuests}
						type="button"
					>
						<img src={minusIcon} alt="minus_icon" />
					</button>
					<div class="text-[25px] w-[60px] text-center">{guestsValue}</div>
					<button
						class="p-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
						on:click={incrementGuests}
						type="button"
					>
						<img src={plusIcon} alt="plus_icon" />
					</button>
				</div>
				<div class="w-6/12">
					<div
						class="flex items-center justify-between px-[15px] h-full relative border border-solid border-[#b1aaa8] rounded-lg"
					>
						<ul class="flex gap-x-[10px]">
							{#if tablesValue.length === 0}
								<div class="text-[#a7a7a7]">Select Table</div>
							{/if}
							{#each tablesValue as table, index}
								<li
									class="flex items-center gap-x-[10px] text-[12px] px-[10px] py-[5px] bg-[#f5f5f3] rounded-3xl"
								>
									<div>
										{table}
									</div>
									<button
										class="flex justify-center items-center w-[20px] h-[20px] text-[20px] rounded-full text-white bg-[#d7d3d0]"
										type="button"
										on:click={(e) => removeTable(e, index)}>×</button
									>
								</li>
							{/each}
						</ul>
						<button on:click={openSelectTable} type="button">
							<img src={arrowDropDown} alt="arrow_drop_down_icon" />
						</button>
						{#if selectTableModalOpen}
							<div
								class="w-full absolute top-[100%] left-0 border border-solid border-[#b1aaa8] rounded-lg bg-white"
							>
								{#each tableList as table}
									<div
										class="p-[20px] relativerounded-lg hover:bg-slate-100"
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
				bind:value={noteValue}
				on:input={changeNote}
			/>
		</div>
		<button type="submit" class="text-white py-[20px] bg-primary rounded-lg">Save</button>
	</form>
</div>
