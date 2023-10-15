<script>
	import axios from 'axios';
	import { editDate, editHour, editMinute, editMeridiem } from '../../../stores/reservationData';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import alarmIcon from '../../../lib/icons/alarm_on.svg';
	import todayIcon from '../../../lib/icons/today.svg';
	import trashIcon from '../../../lib/icons/trash.svg';
	import chevronUp from '../../../lib/icons/chevron-up.svg';
	import chevronDown from '../../../lib/icons/chevron-down.svg';

	const reservationId = $page.params.reservationId;

	let detailDateData;

	let editDateValue;
	let editHourValue;
	let editMinuteValue;
	let editMeridiemValue;

	let selectDateModalOpen = false;

	const dateList = ['May 10', 'June 20'];

	const getDetailDateData = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/reservation/${reservationId}`);
			detailDateData = res.data;
			editDate.update((date) => (date = detailDateData.date));
			editHour.update((date) => (date = detailDateData.hour));
			editMinute.update((date) => (date = detailDateData.minute));
			editMeridiem.update((date) => (date = detailDateData.meridiem));
		} catch (err) {
			console.error(err);
		}
	};

	onMount(() => {
		getDetailDateData();
	});

	editDate.subscribe((value) => {
		editDateValue = value;
	});

	editHour.subscribe((value) => {
		editHourValue = value;
	});

	editMinute.subscribe((value) => {
		editMinuteValue = value;
	});

	editMeridiem.subscribe((value) => {
		editMeridiemValue = value;
	});

	const openSelectDate = () => {
		selectDateModalOpen = selectDateModalOpen ? false : true;
	};

	const selectDate = (value) => {
		editDate.update((date) => (date = value));
	};

	const hourUp = () => {
		if (editHourValue !== 12) {
			editHour.update((value) => value + 1);
		} else {
			editHour.update((value) => (value = 1));
		}
	};

	const hourDown = () => {
		if (editHourValue !== 1) {
			editHour.update((value) => value - 1);
		} else {
			editHour.update((value) => (value = 12));
		}
	};

	const minuteUp = () => {
		if (editMinute !== 59) {
			editMinute.update((value) => value + 1);
		} else {
			editMinute.update((value) => (value = 0));
		}
	};

	const minuteDown = () => {
		if (editMinuteValue !== 0) {
			editMinute.update((value) => value - 1);
		} else {
			editMinute.update((value) => (value = 59));
		}
	};

	const meridiemChange = () => {
		if (editMeridiemValue === 'AM') {
			editMeridiem.update((value) => (value = 'PM'));
		} else {
			editMeridiem.update((value) => (value = 'AM'));
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
		editDate.set('');
		editHour.set(1);
		editMinute.set(0);
		editMeridiem.set('AM');
	};

	const moveNewReservationPage = () => {
		goto(`/edit/${reservationId}`);
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
			{editHourValue} : {String(editMinuteValue).padStart(2, '0')}
			{editMeridiemValue}
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
			{#if editDateValue === ''}
				<div class="text-[#a7a7a7]">Select Date</div>
			{/if}
			{editDateValue}
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
				<div class="text-[30px]">{String(editHourValue).padStart(2, '0')}</div>
				<button on:click={hourDown}>
					<img src={chevronDown} alt="chevronDown_icon" />
				</button>
			</div>
			<div class="text-[27px]">:</div>
			<div class="flex flex-col gap-y-[8px] items-center">
				<button on:click={minuteUp}>
					<img src={chevronUp} alt="chevronUp_icon" />
				</button>
				<div class="text-[30px]">{String(editMinuteValue).padStart(2, '0')}</div>
				<button on:click={minuteDown}>
					<img src={chevronDown} alt="chevronDown_icon" />
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-y-[15px] items-center">
			<button on:click={meridiemChange}>
				<img src={chevronUp} alt="chevronUp_icon" />
			</button>
			<div class="text-[20px]">{editMeridiemValue}</div>
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
