<script>
	import addIcon from '../lib/icons/add.svg';
	import closeIcon from '../lib/icons/close.svg';
	import ReservationCard from '../components/ReservationCard.svelte';
	import { reservationsStore } from '../stores/reservations';

	let reservations;

	reservationsStore.subscribe((value) => {
		reservations = value;
	});
</script>

<div class="w-[800px] h-[600px] border border-solid border-[#848484] rounded-xl">
	<header class="flex items-center h-[75px] bg-white rounded-t-xl">
		<div class="basis-[30%] pl-[20px]">
			<a href="/new">
				<button
					class="flex items-center gap-x-[5px] px-[20px] py-[15px] bg-[#f7f7f5] rounded-lg shadow-lg"
					><img src={addIcon} alt="add_icon" />
					<div class="text-primary">New Reservation</div>
				</button>
			</a>
		</div>
		<div class="flex justify-center basis-[40%]">
			<div class="text-[25px] text-[#6b6460]">Reservation</div>
		</div>
		<div class="flex items-center justify-end basis-[30%] pr-[20px] text-righ">
			<button>
				<img src={closeIcon} alt="close_icon" />
			</button>
		</div>
	</header>
	<ul
		class="flex flex-wrap p-[20px] gap-[14px] bg-[#f5f5f3] h-[calc(100%-75px)] rounded-b-xl overflow-auto"
	>
		{#each reservations as reservation}
			<ReservationCard {reservation} />
		{/each}
	</ul>
</div>
