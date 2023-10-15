<script>
	import { date, hour, minute, meridiem } from '../../stores/reservationData';
	import { goto } from '$app/navigation';
	import alarmIcon from '../../lib/icons/alarm_on.svg';
	import todayIcon from '../../lib/icons/today.svg';
	import trashIcon from '../../lib/icons/trash.svg';
	import chevronUp from '../../lib/icons/chevron-up.svg';
	import chevronDown from '../../lib/icons/chevron-down.svg';

	let dateValue;
	let hourValue;
	let minuteValue;
	let meridiemValue;

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

	let selectDateModalOpen = false;

	const dateList = ['May 10', 'June 20'];

	const openSelectDate = () => {
		selectDateModalOpen = selectDateModalOpen ? false : true;
	};

	const selectDate = (value) => {
		date.update((date) => (date = value));
	};

	const hourUp = () => {
		if (hourValue !== 12) {
			hour.update((value) => value + 1);
		} else {
			hour.update((value) => (value = 1));
		}
	};

	const hourDown = () => {
		if (hourValue !== 1) {
			hour.update((value) => value - 1);
		} else {
			hour.update((value) => (value = 12));
		}
	};

	const minuteUp = () => {
		if (minuteValue !== 59) {
			minute.update((value) => value + 1);
		} else {
			minute.update((value) => (value = 0));
		}
	};

	const minuteDown = () => {
		if (minuteValue !== 0) {
			minute.update((value) => value - 1);
		} else {
			minute.update((value) => (value = 59));
		}
	};

	const meridiemChange = () => {
		if (meridiemValue === 'AM') {
			meridiem.update((value) => (value = 'PM'));
		} else {
			meridiem.update((value) => (value = 'AM'));
		}
	};

	const handleKeyDownOpenDateList = (e) => {
		if (e.key === 'Enter') {
			openSelectDate();
		}
	};

	const handleKeyDownSelectDate = (e) => {
		if (e.key === 'Enter') {
			selectDate(table);
		}
	};

	const resetDateAndTime = () => {
		date.set('');
		hour.set(1);
		minute.set(0);
		meridiem.set('AM');
	};

	const moveNewReservationPage = () => {
		goto('/new');
	};
</script>

<div
	class="flex flex-col gap-y-[20px] w-[350px] p-[20px] border border-solid border-[#848484] bg-white rounded-xl"
>
	<div class="flex items-center gap-x-[10px]">
		<img src={alarmIcon} alt="alarm_icon" />
		<div
			class="flex items-center w-full px-[25px] min-h-[60px] border border-solid border-[#b1aaa8] rounded-lg"
		>
			{hourValue} : {String(minuteValue).padStart(2, '0')}
			{meridiemValue}
		</div>
	</div>
	<div class="flex items-center gap-x-[10px]">
		<img src={todayIcon} alt="event_icon" />
		<div
			class="flex items-center w-full px-[25px] min-h-[60px] h-full relative border border-solid border-[#b1aaa8] rounded-lg"
			on:click={openSelectDate}
			on:keydown={handleKeyDownOpenDateList}
			role="button"
			tabindex="0"
		>
			{#if dateValue === ''}
				<div class="text-[#a7a7a7]">Select Date</div>
			{/if}
			{dateValue}
			{#if selectDateModalOpen}
				<div
					class="w-full absolute top-[100%] left-0 border border-solid border-[#b1aaa8] rounded-lg bg-white"
				>
					{#each dateList as date}
						<div
							class="p-[20px] relative rounded-lg hover:bg-slate-100"
							on:click={() => selectDate(date)}
							on:keydown={handleKeyDownSelectDate}
							role="button"
							tabindex="0"
						>
							{date}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="flex justify-center items-center gap-x-[40px]">
		<div class="flex items-center gap-x-[20px]">
			<div class="flex flex-col gap-y-[8px] items-center">
				<button on:click={hourUp}>
					<img src={chevronUp} alt="chevronUp_icon" />
				</button>
				<div class="text-[30px]">{String(hourValue).padStart(2, '0')}</div>
				<button on:click={hourDown}>
					<img src={chevronDown} alt="chevronDown_icon" />
				</button>
			</div>
			<div class="text-[27px]">:</div>
			<div class="flex flex-col gap-y-[8px] items-center">
				<button on:click={minuteUp}>
					<img src={chevronUp} alt="chevronUp_icon" />
				</button>
				<div class="text-[30px]">{String(minuteValue).padStart(2, '0')}</div>
				<button on:click={minuteDown}>
					<img src={chevronDown} alt="chevronDown_icon" />
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-y-[15px] items-center">
			<button on:click={meridiemChange}>
				<img src={chevronUp} alt="chevronUp_icon" />
			</button>
			<div class="text-[20px]">{meridiemValue}</div>
			<button on:click={meridiemChange}>
				<img src={chevronDown} alt="chevronDown_icon" />
			</button>
		</div>
	</div>

	<div class="flex items-center gap-x-[10px]">
		<button
			class="px-[15px] py-[10px] bg-[#f7f7f5] rounded-lg shadow-lg"
			on:click={resetDateAndTime}
		>
			<img src={trashIcon} alt="trash_icon" />
		</button>
		<button
			class="w-full text-white py-[10px] bg-primary rounded-lg shadow-lg"
			on:click={moveNewReservationPage}
		>
			Save
		</button>
	</div>
</div>
