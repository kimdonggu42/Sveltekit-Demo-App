<script>
	import { reservationsStore } from '../stores/reservations';
	import trashIcon from '../lib/icons/trash.svg';
	import phoneIcon from '../lib/icons/phone.svg';
	import eventIcon from '../lib/icons/event_available.svg';
	import groupIcon from '../lib/icons/group.svg';
	import editIcon from '../lib/icons/edit.svg';

	export let reservation;

	const renameTable = (table) => {
		return table.split('Table')[1].trim();
	};

	const handleDeleteReservation = async (e, reservationId) => {
		e.preventDefault();
		await reservationsStore.deleteReservation(reservationId);
	};

	const handlePatchSeated = async (e, reservationId, seatedState) => {
		e.preventDefault();
		const newSeated = {
			seated: seatedState ? false : true
		};
		await reservationsStore.seatedReservation(reservationId, newSeated);
	};
</script>

{#if !reservation.seated}
	<li>
		<a
			href={`/edit/${reservation.id}`}
			class="flex flex-col h-fit gap-y-[15px] p-[15px] bg-white rounded-xl shadow-lg"
		>
			<div class="flex items-center gap-x-[10px]">
				<div>{reservation.name}</div>
				<div
					class="flex items-center gap-x-[2px] px-[10px] py-[5px] shadow-lg bg-[#f7f7f7] rounded-xl"
				>
					<img src={phoneIcon} alt="phone_icon" />
					<div class="text-[14px] text-[#6b6460]">{reservation.phone}</div>
				</div>
			</div>
			<div class="flex items-center gap-x-[7px]">
				<img src={eventIcon} alt="event_icon" />
				<div>
					{reservation.date}, {reservation.hour}:{String(reservation.minute).padStart(2, '0')}
					{reservation.meridiem}
				</div>
			</div>
			<div class="flex items-center gap-x-[7px]">
				<img src={groupIcon} alt="group_icon" />
				<div>{reservation.guests}</div>
			</div>
			<div class="flex gap-x-[7px]">
				{#if reservation.table.length !== 0}
					<div class="text-[#6b6460]">Reserved Table</div>
				{:else}
					<div class="text-[#bcb5b3] italic">No Selected Table</div>
				{/if}
				<ul>
					{#each reservation.table as table}
						<li>{renameTable(table)}</li>
					{/each}
				</ul>
			</div>
			<div class="flex items-center gap-x-[7px]">
				<div>{reservation.note}</div>
				{#if reservation.note.length !== 0}
					<img src={editIcon} alt="edit_icon" />
				{/if}
			</div>
			<div class="flex items-center gap-x-[10px]">
				<button
					class="p-[15px] bg-[#f7f7f5] rounded-lg shadow-lg"
					on:click={(e) => handleDeleteReservation(e, reservation.id)}
					><img src={trashIcon} alt="trash_icon" /></button
				>
				<button
					class="w-[140px] text-white py-[15px] bg-primary rounded-lg shadow-lg"
					on:click={(e) => handlePatchSeated(e, reservation.id, reservation.seated)}
				>
					Seated
				</button>
			</div>
		</a>
	</li>
{/if}
