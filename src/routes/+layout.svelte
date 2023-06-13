<script lang="ts">
	import '../app.scss';
	import { mode } from '../lib/stores/mode';

	const body = document.body as HTMLBodyElement;

	const updateMode = (mode: string) => {
		if (mode === 'light') {
			body.classList.add('light');
			body.classList.remove('dark');
		} else {
			body.classList.add('dark');
			body.classList.remove('light');
		}
	};

	$: updateMode($mode);
</script>

<slot />