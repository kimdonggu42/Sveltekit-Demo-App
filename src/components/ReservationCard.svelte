<script>
	import trashIcon from '../lib/icons/trash.svg';
	import phoneIcon from '../lib/icons/phone.svg';
	import eventIcon from '../lib/icons/event_available.svg';
	import groupIcon from '../lib/icons/group.svg';
	import editIcon from '../lib/icons/edit.svg';

	export let reservation;

	const renameTable = (table) => {
		return table.split('Table')[1].trim();
	};

	const renameTime = (time) => {
		if (String(time).length === 1) {
			return String(time).padStart(2, '0');
		} else {
			return time;
		}
	};
</script>

<li class="flex flex-col gap-y-[15px] p-[15px] bg-white rounded-xl shadow-lg">
	<div class="flex items-center gap-x-[10px]">
		<div>{reservation.name}</div>
		<div class="flex items-center gap-x-[2px] px-[10px] py-[5px] shadow-lg bg-[#f7f7f7] rounded-xl">
			<img src={phoneIcon} alt="phone_icon" />
			<div class="text-[14px] text-[#6b6460]">{reservation.phone}</div>
		</div>
	</div>
	<div class="flex items-center gap-x-[7px]">
		<img src={eventIcon} alt="event_icon" />
		<div>
			{reservation.date}, {renameTime(reservation.hour)}:{renameTime(reservation.minute)}
			{reservation.meridiem}
		</div>
	</div>
	<div class="flex items-center gap-x-[7px]">
		<img src={groupIcon} alt="group_icon" />
		<div>{reservation.guests}</div>
	</div>
	<div class="flex gap-x-[7px]">
		<div class="text-[#6b6460]">Reserved Table</div>
		<ul>
			{#each reservation.table as table}
				<li>{renameTable(table)}</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center gap-x-[7px]">
		<div>{reservation.note}</div>
		<img src={editIcon} alt="edit_icon" />
	</div>
	<div class="flex items-center gap-x-[10px]">
		<button class="p-[15px] bg-[#f7f7f5] rounded-lg shadow-lg"
			><img src={trashIcon} alt="trash_icon" /></button
		>
		<button class="w-[140px] text-white py-[15px] bg-primary rounded-lg shadow-lg">Seated</button>
	</div>
</li>
