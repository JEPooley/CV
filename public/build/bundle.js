
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/ExperienceTag.svelte generated by Svelte v3.47.0 */

    const file$6 = "src/components/ExperienceTag.svelte";

    // (13:2) {#if src}
    function create_if_block$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*alt*/ ctx[5]);
    			attr_dev(img, "class", "svelte-5ssxgo");
    			add_location(img, file$6, 13, 4, 214);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*src*/ 8 && !src_url_equal(img.src, img_src_value = /*src*/ ctx[3])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*alt*/ 32) {
    				attr_dev(img, "alt", /*alt*/ ctx[5]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(13:2) {#if src}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let h3;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let div0;
    	let a;
    	let t3;
    	let t4;
    	let t5;
    	let if_block = /*src*/ ctx[3] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t2 = space();
    			div0 = element("div");
    			a = element("a");
    			t3 = text(/*company*/ ctx[1]);
    			t4 = space();
    			t5 = text(/*date*/ ctx[2]);
    			add_location(h3, file$6, 10, 0, 157);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", /*href*/ ctx[4]);
    			add_location(a, file$6, 16, 4, 277);
    			attr_dev(div0, "class", "text-container svelte-5ssxgo");
    			add_location(div0, file$6, 15, 2, 244);
    			attr_dev(div1, "class", "container svelte-5ssxgo");
    			add_location(div1, file$6, 11, 0, 174);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			append_dev(a, t3);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (/*src*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(div1, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*company*/ 2) set_data_dev(t3, /*company*/ ctx[1]);

    			if (dirty & /*href*/ 16) {
    				attr_dev(a, "href", /*href*/ ctx[4]);
    			}

    			if (dirty & /*date*/ 4) set_data_dev(t5, /*date*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ExperienceTag', slots, []);
    	let { title } = $$props;
    	let { company } = $$props;
    	let { date } = $$props;
    	let { src } = $$props;
    	let { href = "" } = $$props;
    	let { alt = "" } = $$props;
    	const writable_props = ['title', 'company', 'date', 'src', 'href', 'alt'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ExperienceTag> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('company' in $$props) $$invalidate(1, company = $$props.company);
    		if ('date' in $$props) $$invalidate(2, date = $$props.date);
    		if ('src' in $$props) $$invalidate(3, src = $$props.src);
    		if ('href' in $$props) $$invalidate(4, href = $$props.href);
    		if ('alt' in $$props) $$invalidate(5, alt = $$props.alt);
    	};

    	$$self.$capture_state = () => ({ title, company, date, src, href, alt });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('company' in $$props) $$invalidate(1, company = $$props.company);
    		if ('date' in $$props) $$invalidate(2, date = $$props.date);
    		if ('src' in $$props) $$invalidate(3, src = $$props.src);
    		if ('href' in $$props) $$invalidate(4, href = $$props.href);
    		if ('alt' in $$props) $$invalidate(5, alt = $$props.alt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, company, date, src, href, alt];
    }

    class ExperienceTag extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			title: 0,
    			company: 1,
    			date: 2,
    			src: 3,
    			href: 4,
    			alt: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExperienceTag",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<ExperienceTag> was created without expected prop 'title'");
    		}

    		if (/*company*/ ctx[1] === undefined && !('company' in props)) {
    			console.warn("<ExperienceTag> was created without expected prop 'company'");
    		}

    		if (/*date*/ ctx[2] === undefined && !('date' in props)) {
    			console.warn("<ExperienceTag> was created without expected prop 'date'");
    		}

    		if (/*src*/ ctx[3] === undefined && !('src' in props)) {
    			console.warn("<ExperienceTag> was created without expected prop 'src'");
    		}
    	}

    	get title() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get company() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set company(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<ExperienceTag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<ExperienceTag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/HighlightText.svelte generated by Svelte v3.47.0 */

    const file$5 = "src/components/HighlightText.svelte";

    function create_fragment$7(ctx) {
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot) default_slot.c();
    			set_style(p, "--border-color", "rgba(" + /*rgb*/ ctx[0].join(",") + ",0.1)");
    			set_style(p, "--background", "rgba(" + /*rgb*/ ctx[0].join(",") + ",0.04)");
    			attr_dev(p, "class", "svelte-1jkxs2a");
    			add_location(p, file$5, 5, 0, 64);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*rgb*/ 1) {
    				set_style(p, "--border-color", "rgba(" + /*rgb*/ ctx[0].join(",") + ",0.1)");
    			}

    			if (!current || dirty & /*rgb*/ 1) {
    				set_style(p, "--background", "rgba(" + /*rgb*/ ctx[0].join(",") + ",0.04)");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HighlightText', slots, ['default']);
    	let { rgb = [10, 10, 10] } = $$props;
    	const writable_props = ['rgb'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HighlightText> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ rgb });

    	$$self.$inject_state = $$props => {
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rgb, $$scope, slots];
    }

    class HighlightText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { rgb: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HighlightText",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get rgb() {
    		throw new Error("<HighlightText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rgb(value) {
    		throw new Error("<HighlightText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // contacts.js

    const contacts = [ // List of contact information
        {
            name: "GitHub",
            href: "https://github.com/JEPooley",
            text: "github.com/JEPooley",
            icon: "fa-brands fa-github"
        },
        {
            name: "CodePen",
            href: "https://codepen.io/jepooley",
            text: "codepen.io/jepooley",
            icon: "fa-brands fa-codepen"
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/josh-pooley/",
            text: "linkedin.com/in/josh-pooley/",
            icon: "fa-brands fa-linkedin"
        },
    ];

    /* src/components/Contact.svelte generated by Svelte v3.47.0 */

    const file$4 = "src/components/Contact.svelte";

    // (14:2) {:else}
    function create_else_block(ctx) {
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot) default_slot.c();
    			attr_dev(p, "class", "text svelte-1qtfxf");
    			add_location(p, file$4, 14, 4, 226);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(14:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (10:2) {#if href}
    function create_if_block$1(ctx) {
    	let a;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", /*href*/ ctx[2]);
    			attr_dev(a, "class", "text svelte-1qtfxf");
    			add_location(a, file$4, 10, 4, 148);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*href*/ 4) {
    				attr_dev(a, "href", /*href*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(10:2) {#if href}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let h4;
    	let i;
    	let i_class_value;
    	let t0;
    	let t1;
    	let t2;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[2]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			i = element("i");
    			t0 = space();
    			t1 = text(/*name*/ ctx[0]);
    			t2 = space();
    			if_block.c();
    			attr_dev(i, "class", i_class_value = "" + (null_to_empty(/*icon*/ ctx[1]) + " svelte-1qtfxf"));
    			add_location(i, file$4, 8, 6, 100);
    			attr_dev(h4, "class", "svelte-1qtfxf");
    			add_location(h4, file$4, 8, 2, 96);
    			add_location(div, file$4, 7, 0, 88);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(h4, i);
    			append_dev(h4, t0);
    			append_dev(h4, t1);
    			append_dev(div, t2);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 2 && i_class_value !== (i_class_value = "" + (null_to_empty(/*icon*/ ctx[1]) + " svelte-1qtfxf"))) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (!current || dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, ['default']);
    	let { name } = $$props;
    	let { icon } = $$props;
    	let { href } = $$props;
    	const writable_props = ['name', 'icon', 'href'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('icon' in $$props) $$invalidate(1, icon = $$props.icon);
    		if ('href' in $$props) $$invalidate(2, href = $$props.href);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ name, icon, href });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('icon' in $$props) $$invalidate(1, icon = $$props.icon);
    		if ('href' in $$props) $$invalidate(2, href = $$props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, icon, href, $$scope, slots];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { name: 0, icon: 1, href: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<Contact> was created without expected prop 'name'");
    		}

    		if (/*icon*/ ctx[1] === undefined && !('icon' in props)) {
    			console.warn("<Contact> was created without expected prop 'icon'");
    		}

    		if (/*href*/ ctx[2] === undefined && !('href' in props)) {
    			console.warn("<Contact> was created without expected prop 'href'");
    		}
    	}

    	get name() {
    		throw new Error("<Contact>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Contact>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Contact>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Contact>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Contact>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Contact>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ContactSet.svelte generated by Svelte v3.47.0 */

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (8:2) <Contact     name={contact.name}     icon={contact.icon}     href={contact.href}     >
    function create_default_slot$2(ctx) {
    	let t0_value = /*contact*/ ctx[0].text + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(8:2) <Contact     name={contact.name}     icon={contact.icon}     href={contact.href}     >",
    		ctx
    	});

    	return block;
    }

    // (7:0) {#each contacts as contact}
    function create_each_block$1(ctx) {
    	let contact;
    	let current;

    	contact = new Contact({
    			props: {
    				name: /*contact*/ ctx[0].name,
    				icon: /*contact*/ ctx[0].icon,
    				href: /*contact*/ ctx[0].href,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contact.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contact, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contact_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				contact_changes.$$scope = { dirty, ctx };
    			}

    			contact.$set(contact_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contact, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(7:0) {#each contacts as contact}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = contacts;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*contacts*/ 0) {
    				each_value = contacts;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactSet', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactSet> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ contacts, Contact });
    	return [];
    }

    class ContactSet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactSet",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    // skills.js

    const skills = [ // List of contact information
        {
            name: "Python Development",
            text: "Numpy, Pandas, Git, pytest, Flask, Matplotlib, OOP, FastAPI, TDD, Trunk Based Development",
            rating: "90"
        },
        {
            name: "Prototyping",
            text: "Creative Problem Solving, Human-Centered Design, Collaborative Working",
            rating: "80"
        },
        {
            name: "Front-End Development",
            text: "HTML5, CSS/SCSS, Vanilla JS, Leaflet, Svelte, Node",
            rating: "75"
        },
        {
            name: "Writing",
            text: "Papers, Reports, Blogs, Patents, LaTeX",
            rating: "75"
        },
        {
            name: "Geospatial Analysis",
            text: "GeoPandas, Rasterio, QGIS/ArcGIS, Vector Data, Raster Data",
            rating: "70"
        },
        {
            name: "Data Science",
            text: "scikit-learn, scikit-image, NetworkX, AzureML",
            rating: "65"
        },
        {
            name: "Agile Methodologies",
            text: "Scrum Developer, Scrum Master, MS DevOps",
            rating: "60"
        },
    ];

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    /* src/components/RatingBar.svelte generated by Svelte v3.47.0 */
    const file$3 = "src/components/RatingBar.svelte";

    // (28:2) {#if ready}
    function create_if_block(ctx) {
    	let div;
    	let div_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "rating svelte-1w5kicj");
    			set_style(div, "--width", /*rating*/ ctx[0] + "%");
    			add_location(div, file$3, 28, 4, 521);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*rating*/ 1) {
    				set_style(div, "--width", /*rating*/ ctx[0] + "%");
    			}
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, /*slideBounce*/ ctx[3], { duration: 1500, delay: /*delay*/ ctx[1] });
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(28:2) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let if_block = /*ready*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "container svelte-1w5kicj");
    			add_location(div, file$3, 26, 0, 479);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ready*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RatingBar', slots, []);
    	let { rating } = $$props;
    	let { delay = 500 } = $$props;

    	// Init
    	let ready = false;

    	onMount(() => $$invalidate(2, ready = true));

    	// Transition
    	function slideBounce(node, { duration, delay }) {
    		return {
    			duration,
    			delay,
    			css: t => {
    				const eased = cubicOut(t);
    				return `transform: scaleX(${eased});`;
    			}
    		};
    	}

    	const writable_props = ['rating', 'delay'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RatingBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rating' in $$props) $$invalidate(0, rating = $$props.rating);
    		if ('delay' in $$props) $$invalidate(1, delay = $$props.delay);
    	};

    	$$self.$capture_state = () => ({
    		cubicOut,
    		onMount,
    		rating,
    		delay,
    		ready,
    		slideBounce
    	});

    	$$self.$inject_state = $$props => {
    		if ('rating' in $$props) $$invalidate(0, rating = $$props.rating);
    		if ('delay' in $$props) $$invalidate(1, delay = $$props.delay);
    		if ('ready' in $$props) $$invalidate(2, ready = $$props.ready);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rating, delay, ready, slideBounce];
    }

    class RatingBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { rating: 0, delay: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RatingBar",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rating*/ ctx[0] === undefined && !('rating' in props)) {
    			console.warn("<RatingBar> was created without expected prop 'rating'");
    		}
    	}

    	get rating() {
    		throw new Error("<RatingBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rating(value) {
    		throw new Error("<RatingBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get delay() {
    		throw new Error("<RatingBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set delay(value) {
    		throw new Error("<RatingBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Skill.svelte generated by Svelte v3.47.0 */
    const file$2 = "src/components/Skill.svelte";

    function create_fragment$3(ctx) {
    	let div0;
    	let h4;
    	let t0;
    	let t1;
    	let ratingbar;
    	let t2;
    	let div1;
    	let current;

    	ratingbar = new RatingBar({
    			props: {
    				rating: /*rating*/ ctx[1],
    				delay: /*delay*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h4 = element("h4");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			create_component(ratingbar.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(h4, "class", "svelte-1s2vexv");
    			add_location(h4, file$2, 12, 2, 160);
    			add_location(div0, file$2, 11, 0, 152);
    			attr_dev(div1, "id", "details");
    			attr_dev(div1, "class", "svelte-1s2vexv");
    			add_location(div1, file$2, 15, 0, 215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h4);
    			append_dev(h4, t0);
    			append_dev(div0, t1);
    			mount_component(ratingbar, div0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
    			const ratingbar_changes = {};
    			if (dirty & /*rating*/ 2) ratingbar_changes.rating = /*rating*/ ctx[1];
    			if (dirty & /*delay*/ 4) ratingbar_changes.delay = /*delay*/ ctx[2];
    			ratingbar.$set(ratingbar_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ratingbar.$$.fragment, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ratingbar.$$.fragment, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(ratingbar);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skill', slots, ['default']);
    	let { name } = $$props;
    	let { rating } = $$props;
    	let { delay } = $$props;
    	const writable_props = ['name', 'rating', 'delay'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skill> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('rating' in $$props) $$invalidate(1, rating = $$props.rating);
    		if ('delay' in $$props) $$invalidate(2, delay = $$props.delay);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ RatingBar, name, rating, delay });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('rating' in $$props) $$invalidate(1, rating = $$props.rating);
    		if ('delay' in $$props) $$invalidate(2, delay = $$props.delay);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, rating, delay, $$scope, slots];
    }

    class Skill extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { name: 0, rating: 1, delay: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skill",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<Skill> was created without expected prop 'name'");
    		}

    		if (/*rating*/ ctx[1] === undefined && !('rating' in props)) {
    			console.warn("<Skill> was created without expected prop 'rating'");
    		}

    		if (/*delay*/ ctx[2] === undefined && !('delay' in props)) {
    			console.warn("<Skill> was created without expected prop 'delay'");
    		}
    	}

    	get name() {
    		throw new Error("<Skill>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Skill>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rating() {
    		throw new Error("<Skill>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rating(value) {
    		throw new Error("<Skill>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get delay() {
    		throw new Error("<Skill>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set delay(value) {
    		throw new Error("<Skill>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/SkillSet.svelte generated by Svelte v3.47.0 */

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	child_ctx[2] = i;
    	return child_ctx;
    }

    // (8:4) <Skill       name={skill.name}       rating={skill.rating}       delay={500 + i*100}       >
    function create_default_slot$1(ctx) {
    	let t0_value = /*skill*/ ctx[0].text + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(8:4) <Skill       name={skill.name}       rating={skill.rating}       delay={500 + i*100}       >",
    		ctx
    	});

    	return block;
    }

    // (7:2) {#each skills as skill, i}
    function create_each_block(ctx) {
    	let skill;
    	let current;

    	skill = new Skill({
    			props: {
    				name: /*skill*/ ctx[0].name,
    				rating: /*skill*/ ctx[0].rating,
    				delay: 500 + /*i*/ ctx[2] * 100,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(skill.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skill, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skill_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				skill_changes.$$scope = { dirty, ctx };
    			}

    			skill.$set(skill_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skill, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:2) {#each skills as skill, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = skills;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*skills*/ 0) {
    				each_value = skills;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillSet', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkillSet> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ skills, Skill });
    	return [];
    }

    class SkillSet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillSet",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/SubHeading.svelte generated by Svelte v3.47.0 */

    const file$1 = "src/components/SubHeading.svelte";

    function create_fragment$1(ctx) {
    	let h2;
    	let t;
    	let hr;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			if (default_slot) default_slot.c();
    			t = space();
    			hr = element("hr");
    			attr_dev(h2, "class", "svelte-1bs1td3");
    			add_location(h2, file$1, 0, 0, 0);
    			attr_dev(hr, "class", "svelte-1bs1td3");
    			add_location(hr, file$1, 3, 0, 22);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);

    			if (default_slot) {
    				default_slot.m(h2, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, hr, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SubHeading', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SubHeading> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class SubHeading extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SubHeading",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */
    const file = "src/App.svelte";

    // (43:6) <SubHeading>
    function create_default_slot_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Core Skills");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(43:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (45:6) <SubHeading>
    function create_default_slot_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Some Experience with");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(45:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (55:4) <SubHeading>
    function create_default_slot_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("About Me");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(55:4) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (63:6) <SubHeading>
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Experience");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(63:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (72:6) <HighlightText>
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("I have been a part of Ordnance Survey's Rapid Prototyping Team since its\n        inception in 2020. This role is hugely diverse and I have developed a\n        wide range of skills including Python development, data science, web\n        development, human-centered design, agile development and much more!");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(72:6) <HighlightText>",
    		ctx
    	});

    	return block;
    }

    // (86:6) <HighlightText>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("My post-graduate research was focussed on the development of high-speed\n        sensors for deployment in harsh envionments. The work was a mixture of\n        practical lab-based experimentation, computer modelling and writing\n        research papers.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(86:6) <HighlightText>",
    		ctx
    	});

    	return block;
    }

    // (95:6) <SubHeading>
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Education");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(95:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (119:6) <SubHeading>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Project Highlights");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(119:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    // (148:6) <SubHeading>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Written Work");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(148:6) <SubHeading>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link0;
    	let link1;
    	let link2;
    	let script;
    	let script_src_value;
    	let link3;
    	let link4;
    	let link5;
    	let link6;
    	let link7;
    	let meta0;
    	let meta1;
    	let t0;
    	let main;
    	let aside;
    	let header;
    	let div0;
    	let img;
    	let img_src_value;
    	let t1;
    	let h1;
    	let t3;
    	let p0;
    	let t5;
    	let div1;
    	let contactset;
    	let t6;
    	let section0;
    	let subheading0;
    	let t7;
    	let skillset;
    	let t8;
    	let subheading1;
    	let t9;
    	let ul0;
    	let li0;
    	let t11;
    	let li1;
    	let t13;
    	let li2;
    	let t15;
    	let div2;
    	let subheading2;
    	let t16;
    	let p1;
    	let t18;
    	let section1;
    	let subheading3;
    	let t19;
    	let experiencetag0;
    	let t20;
    	let highlighttext0;
    	let t21;
    	let experiencetag1;
    	let t22;
    	let highlighttext1;
    	let t23;
    	let section2;
    	let subheading4;
    	let t24;
    	let ul1;
    	let li3;
    	let b0;
    	let t26;
    	let a0;
    	let t28;
    	let li4;
    	let b1;
    	let t30;
    	let a1;
    	let t32;
    	let li5;
    	let b2;
    	let t34;
    	let a2;
    	let t36;
    	let section3;
    	let subheading5;
    	let t37;
    	let ul2;
    	let li6;
    	let t38;
    	let a3;
    	let t40;
    	let t41;
    	let li7;
    	let t42;
    	let a4;
    	let t44;
    	let li8;
    	let t45;
    	let a5;
    	let t47;
    	let li9;
    	let t49;
    	let section4;
    	let subheading6;
    	let t50;
    	let ul3;
    	let li10;
    	let a6;
    	let t52;
    	let li11;
    	let a7;
    	let t54;
    	let li12;
    	let a8;
    	let t56;
    	let li13;
    	let a9;
    	let t58;
    	let li14;
    	let a10;
    	let t60;
    	let li15;
    	let a11;
    	let t62;
    	let a12;
    	let t63;
    	let i;
    	let t64;
    	let footer;
    	let current;
    	contactset = new ContactSet({ $$inline: true });

    	subheading0 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	skillset = new SkillSet({ $$inline: true });

    	subheading1 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subheading2 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subheading3 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	experiencetag0 = new ExperienceTag({
    			props: {
    				title: "Data Scientist (Rapid Prototyping)",
    				company: "Ordnance Survey",
    				alt: "Ordnance Survey Logo",
    				date: "January 2020 – Present",
    				src: "./images/os-logo.png",
    				href: "https://www.ordnancesurvey.co.uk"
    			},
    			$$inline: true
    		});

    	highlighttext0 = new HighlightText({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	experiencetag1 = new ExperienceTag({
    			props: {
    				title: "Post-Graduate Researcher",
    				company: "University of Southampton",
    				alt: "University of Southampton Logo",
    				date: "September 2015 – December 2019",
    				src: "./images/soton-logo.jpg",
    				href: "https://www.southampton.ac.uk/"
    			},
    			$$inline: true
    		});

    	highlighttext1 = new HighlightText({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subheading4 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subheading5 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subheading6 = new SubHeading({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			script = element("script");
    			link3 = element("link");
    			link4 = element("link");
    			link5 = element("link");
    			link6 = element("link");
    			link7 = element("link");
    			meta0 = element("meta");
    			meta1 = element("meta");
    			t0 = space();
    			main = element("main");
    			aside = element("aside");
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t1 = space();
    			h1 = element("h1");
    			h1.textContent = "Dr Josh Pooley";
    			t3 = space();
    			p0 = element("p");
    			p0.textContent = "Data Scientist | Developer | Prototyper";
    			t5 = space();
    			div1 = element("div");
    			create_component(contactset.$$.fragment);
    			t6 = space();
    			section0 = element("section");
    			create_component(subheading0.$$.fragment);
    			t7 = space();
    			create_component(skillset.$$.fragment);
    			t8 = space();
    			create_component(subheading1.$$.fragment);
    			t9 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "MS Azure (Web Apps, Serverless Functions)";
    			t11 = space();
    			li1 = element("li");
    			li1.textContent = "Docker";
    			t13 = space();
    			li2 = element("li");
    			li2.textContent = "PyPI & Poetry";
    			t15 = space();
    			div2 = element("div");
    			create_component(subheading2.$$.fragment);
    			t16 = space();
    			p1 = element("p");
    			p1.textContent = "I'm a data scientist, developer and prototyper based in the UK, currently\n      working in the geospatial industry. I love learning about new\n      technologies, being creative and getting stuck in to a new project!";
    			t18 = space();
    			section1 = element("section");
    			create_component(subheading3.$$.fragment);
    			t19 = space();
    			create_component(experiencetag0.$$.fragment);
    			t20 = space();
    			create_component(highlighttext0.$$.fragment);
    			t21 = space();
    			create_component(experiencetag1.$$.fragment);
    			t22 = space();
    			create_component(highlighttext1.$$.fragment);
    			t23 = space();
    			section2 = element("section");
    			create_component(subheading4.$$.fragment);
    			t24 = space();
    			ul1 = element("ul");
    			li3 = element("li");
    			b0 = element("b");
    			b0.textContent = "PhD in Optoelectronics";
    			t26 = text(" -\n          ");
    			a0 = element("a");
    			a0.textContent = "Zepler Institute, University of Southampton";
    			t28 = space();
    			li4 = element("li");
    			b1 = element("b");
    			b1.textContent = "Masters Degree in Physics";
    			t30 = text(" - First Class Honours -\n          ");
    			a1 = element("a");
    			a1.textContent = "University of Southampton";
    			t32 = space();
    			li5 = element("li");
    			b2 = element("b");
    			b2.textContent = "A-Levels";
    			t34 = text(" - Maths (A*), Physics (A), P.E. (A), English Lit. AS\n          (B) -\n          ");
    			a2 = element("a");
    			a2.textContent = "The King's School, Ottery St Mary";
    			t36 = space();
    			section3 = element("section");
    			create_component(subheading5.$$.fragment);
    			t37 = space();
    			ul2 = element("ul");
    			li6 = element("li");
    			t38 = text("Technical lead for the\n          ");
    			a3 = element("a");
    			a3.textContent = "osdatahub";
    			t40 = text("\n          project");
    			t41 = space();
    			li7 = element("li");
    			t42 = text("Technical lead for the\n          ");
    			a4 = element("a");
    			a4.textContent = "OS Data Hub Explorer";
    			t44 = space();
    			li8 = element("li");
    			t45 = text("Technical lead for the\n          ");
    			a5 = element("a");
    			a5.textContent = "OS Heat Data prototype";
    			t47 = space();
    			li9 = element("li");
    			li9.textContent = "Presented COVID-19 infection model to the Newton Institute, Cambridge";
    			t49 = space();
    			section4 = element("section");
    			create_component(subheading6.$$.fragment);
    			t50 = space();
    			ul3 = element("ul");
    			li10 = element("li");
    			a6 = element("a");
    			a6.textContent = "Rapid prototyping: at-home electric vehicle charging";
    			t52 = space();
    			li11 = element("li");
    			a7 = element("a");
    			a7.textContent = "Graphic Design in Python Using Geospatial Data";
    			t54 = space();
    			li12 = element("li");
    			a8 = element("a");
    			a8.textContent = "Fibre optic methods for measuring detonation velocity";
    			t56 = space();
    			li13 = element("li");
    			a9 = element("a");
    			a9.textContent = "Detonation velocity measurements with uniform fibre Bragg gratings";
    			t58 = space();
    			li14 = element("li");
    			a10 = element("a");
    			a10.textContent = "Detonation velocity measurements using rare-earth doped fibres";
    			t60 = space();
    			li15 = element("li");
    			a11 = element("a");
    			a11.textContent = "Optimised chirped fibre Bragg gratings for detonation velocity\n            measurements";
    			t62 = space();
    			a12 = element("a");
    			t63 = text("Download ");
    			i = element("i");
    			t64 = space();
    			footer = element("footer");
    			footer.textContent = "Design by Josh Pooley 2022";
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file, 10, 2, 352);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			attr_dev(link1, "crossorigin", "");
    			add_location(link1, file, 11, 2, 416);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file, 12, 2, 489);
    			if (!src_url_equal(script.src, script_src_value = "https://kit.fontawesome.com/f5272181b3.js")) attr_dev(script, "src", script_src_value);
    			attr_dev(script, "crossorigin", "anonymous");
    			add_location(script, file, 16, 2, 621);
    			attr_dev(link3, "rel", "apple-touch-icon");
    			attr_dev(link3, "sizes", "180x180");
    			attr_dev(link3, "href", "favicons//apple-touch-icon.png");
    			add_location(link3, file, 20, 2, 722);
    			attr_dev(link4, "rel", "icon");
    			attr_dev(link4, "type", "image/png");
    			attr_dev(link4, "sizes", "32x32");
    			attr_dev(link4, "href", "favicons//favicon-32x32.png");
    			add_location(link4, file, 21, 2, 810);
    			attr_dev(link5, "rel", "icon");
    			attr_dev(link5, "type", "image/png");
    			attr_dev(link5, "sizes", "16x16");
    			attr_dev(link5, "href", "favicons//favicon-16x16.png");
    			add_location(link5, file, 22, 2, 898);
    			attr_dev(link6, "rel", "manifest");
    			attr_dev(link6, "href", "favicons//site.webmanifest");
    			add_location(link6, file, 23, 2, 986);
    			attr_dev(link7, "rel", "mask-icon");
    			attr_dev(link7, "href", "favicons//safari-pinned-tab.svg");
    			attr_dev(link7, "color", "#5bbad5");
    			add_location(link7, file, 24, 2, 1046);
    			attr_dev(meta0, "name", "msapplication-TileColor");
    			attr_dev(meta0, "content", "#da532c");
    			add_location(meta0, file, 25, 2, 1128);
    			attr_dev(meta1, "name", "theme-color");
    			attr_dev(meta1, "content", "#ffffff");
    			add_location(meta1, file, 26, 2, 1188);
    			attr_dev(img, "class", "headshot svelte-fgvmuq");
    			if (!src_url_equal(img.src, img_src_value = "./images/josh.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Josh Pooley");
    			add_location(img, file, 33, 8, 1300);
    			attr_dev(h1, "class", "svelte-fgvmuq");
    			add_location(h1, file, 34, 8, 1375);
    			attr_dev(p0, "id", "subtitle");
    			attr_dev(p0, "class", "svelte-fgvmuq");
    			add_location(p0, file, 35, 8, 1407);
    			add_location(div0, file, 32, 6, 1286);
    			attr_dev(div1, "id", "contact");
    			attr_dev(div1, "class", "svelte-fgvmuq");
    			add_location(div1, file, 37, 6, 1487);
    			attr_dev(header, "class", "svelte-fgvmuq");
    			add_location(header, file, 31, 4, 1271);
    			attr_dev(li0, "class", "svelte-fgvmuq");
    			add_location(li0, file, 46, 8, 1703);
    			attr_dev(li1, "class", "svelte-fgvmuq");
    			add_location(li1, file, 47, 8, 1762);
    			attr_dev(li2, "class", "svelte-fgvmuq");
    			add_location(li2, file, 48, 8, 1786);
    			attr_dev(ul0, "class", "svelte-fgvmuq");
    			add_location(ul0, file, 45, 6, 1690);
    			attr_dev(section0, "class", "svelte-fgvmuq");
    			add_location(section0, file, 41, 4, 1560);
    			attr_dev(aside, "class", "svelte-fgvmuq");
    			add_location(aside, file, 30, 2, 1259);
    			add_location(p1, file, 55, 4, 1913);
    			attr_dev(section1, "class", "svelte-fgvmuq");
    			add_location(section1, file, 61, 4, 2153);
    			add_location(b0, file, 97, 10, 3534);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://www.zeplerinstitute.ac.uk/");
    			add_location(a0, file, 98, 10, 3576);
    			attr_dev(li3, "class", "svelte-fgvmuq");
    			add_location(li3, file, 96, 8, 3519);
    			add_location(b1, file, 103, 10, 3746);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://www.southampton.ac.uk/");
    			add_location(a1, file, 104, 10, 3813);
    			attr_dev(li4, "class", "svelte-fgvmuq");
    			add_location(li4, file, 102, 8, 3731);
    			add_location(b2, file, 109, 10, 3961);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://www.thekings.devon.sch.uk/");
    			add_location(a2, file, 111, 10, 4056);
    			attr_dev(li5, "class", "svelte-fgvmuq");
    			add_location(li5, file, 108, 8, 3946);
    			attr_dev(ul1, "class", "svelte-fgvmuq");
    			add_location(ul1, file, 95, 6, 3506);
    			attr_dev(section2, "class", "svelte-fgvmuq");
    			add_location(section2, file, 93, 4, 3449);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://pypi.org/project/osdatahub/");
    			add_location(a3, file, 122, 10, 4351);
    			attr_dev(li6, "class", "svelte-fgvmuq");
    			add_location(li6, file, 120, 8, 4303);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", "https://labs.os.uk/public/data-hub-explorer/");
    			add_location(a4, file, 129, 10, 4539);
    			attr_dev(li7, "class", "svelte-fgvmuq");
    			add_location(li7, file, 127, 8, 4491);
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "href", "https://lively-beach-0877f1c03.azurestaticapps.net/");
    			add_location(a5, file, 135, 10, 4729);
    			attr_dev(li8, "class", "svelte-fgvmuq");
    			add_location(li8, file, 133, 8, 4681);
    			attr_dev(li9, "class", "svelte-fgvmuq");
    			add_location(li9, file, 141, 8, 4904);
    			attr_dev(ul2, "class", "svelte-fgvmuq");
    			add_location(ul2, file, 119, 6, 4290);
    			attr_dev(section3, "class", "svelte-fgvmuq");
    			add_location(section3, file, 117, 4, 4224);
    			attr_dev(a6, "target", "_blank");
    			attr_dev(a6, "href", "https://www.ordnancesurvey.co.uk/newsroom/blog/driveways-ev-hackathon");
    			add_location(a6, file, 150, 10, 5122);
    			attr_dev(li10, "class", "svelte-fgvmuq");
    			add_location(li10, file, 149, 8, 5107);
    			attr_dev(a7, "target", "_blank");
    			attr_dev(a7, "href", "https://python.plainenglish.io/graphic-design-in-python-using-geospatial-data-813e513dc393");
    			add_location(a7, file, 157, 10, 5360);
    			attr_dev(li11, "class", "svelte-fgvmuq");
    			add_location(li11, file, 156, 8, 5345);
    			attr_dev(a8, "target", "_blank");
    			attr_dev(a8, "href", "https://eprints.soton.ac.uk/438653/");
    			add_location(a8, file, 164, 10, 5613);
    			attr_dev(li12, "class", "svelte-fgvmuq");
    			add_location(li12, file, 163, 8, 5598);
    			attr_dev(a9, "target", "_blank");
    			attr_dev(a9, "href", "https://opg.optica.org/oe/fulltext.cfm?uri=oe-27-16-23464&id=416379");
    			add_location(a9, file, 169, 10, 5794);
    			attr_dev(li13, "class", "svelte-fgvmuq");
    			add_location(li13, file, 168, 8, 5779);
    			attr_dev(a10, "target", "_blank");
    			attr_dev(a10, "href", "https://www.mdpi.com/1424-8220/19/7/1697");
    			add_location(a10, file, 176, 10, 6048);
    			attr_dev(li14, "class", "svelte-fgvmuq");
    			add_location(li14, file, 175, 8, 6033);
    			attr_dev(a11, "target", "_blank");
    			attr_dev(a11, "href", "https://www.mdpi.com/1424-8220/19/15/3333");
    			add_location(a11, file, 181, 10, 6243);
    			attr_dev(li15, "class", "svelte-fgvmuq");
    			add_location(li15, file, 180, 8, 6228);
    			attr_dev(ul3, "class", "svelte-fgvmuq");
    			add_location(ul3, file, 148, 6, 5094);
    			attr_dev(section4, "class", "svelte-fgvmuq");
    			add_location(section4, file, 146, 4, 5034);
    			attr_dev(i, "class", "fa-solid fa-download");
    			add_location(i, file, 189, 16, 6536);
    			attr_dev(a12, "id", "download");
    			attr_dev(a12, "download", "");
    			attr_dev(a12, "href", "./files/CV.pdf");
    			attr_dev(a12, "class", "svelte-fgvmuq");
    			add_location(a12, file, 188, 4, 6472);
    			attr_dev(div2, "id", "main-text");
    			attr_dev(div2, "class", "svelte-fgvmuq");
    			add_location(div2, file, 53, 2, 1850);
    			attr_dev(main, "class", "svelte-fgvmuq");
    			add_location(main, file, 29, 0, 1250);
    			attr_dev(footer, "class", "svelte-fgvmuq");
    			add_location(footer, file, 193, 0, 6597);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			append_dev(document.head, script);
    			append_dev(document.head, link3);
    			append_dev(document.head, link4);
    			append_dev(document.head, link5);
    			append_dev(document.head, link6);
    			append_dev(document.head, link7);
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, aside);
    			append_dev(aside, header);
    			append_dev(header, div0);
    			append_dev(div0, img);
    			append_dev(div0, t1);
    			append_dev(div0, h1);
    			append_dev(div0, t3);
    			append_dev(div0, p0);
    			append_dev(header, t5);
    			append_dev(header, div1);
    			mount_component(contactset, div1, null);
    			append_dev(aside, t6);
    			append_dev(aside, section0);
    			mount_component(subheading0, section0, null);
    			append_dev(section0, t7);
    			mount_component(skillset, section0, null);
    			append_dev(section0, t8);
    			mount_component(subheading1, section0, null);
    			append_dev(section0, t9);
    			append_dev(section0, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t11);
    			append_dev(ul0, li1);
    			append_dev(ul0, t13);
    			append_dev(ul0, li2);
    			append_dev(main, t15);
    			append_dev(main, div2);
    			mount_component(subheading2, div2, null);
    			append_dev(div2, t16);
    			append_dev(div2, p1);
    			append_dev(div2, t18);
    			append_dev(div2, section1);
    			mount_component(subheading3, section1, null);
    			append_dev(section1, t19);
    			mount_component(experiencetag0, section1, null);
    			append_dev(section1, t20);
    			mount_component(highlighttext0, section1, null);
    			append_dev(section1, t21);
    			mount_component(experiencetag1, section1, null);
    			append_dev(section1, t22);
    			mount_component(highlighttext1, section1, null);
    			append_dev(div2, t23);
    			append_dev(div2, section2);
    			mount_component(subheading4, section2, null);
    			append_dev(section2, t24);
    			append_dev(section2, ul1);
    			append_dev(ul1, li3);
    			append_dev(li3, b0);
    			append_dev(li3, t26);
    			append_dev(li3, a0);
    			append_dev(ul1, t28);
    			append_dev(ul1, li4);
    			append_dev(li4, b1);
    			append_dev(li4, t30);
    			append_dev(li4, a1);
    			append_dev(ul1, t32);
    			append_dev(ul1, li5);
    			append_dev(li5, b2);
    			append_dev(li5, t34);
    			append_dev(li5, a2);
    			append_dev(div2, t36);
    			append_dev(div2, section3);
    			mount_component(subheading5, section3, null);
    			append_dev(section3, t37);
    			append_dev(section3, ul2);
    			append_dev(ul2, li6);
    			append_dev(li6, t38);
    			append_dev(li6, a3);
    			append_dev(li6, t40);
    			append_dev(ul2, t41);
    			append_dev(ul2, li7);
    			append_dev(li7, t42);
    			append_dev(li7, a4);
    			append_dev(ul2, t44);
    			append_dev(ul2, li8);
    			append_dev(li8, t45);
    			append_dev(li8, a5);
    			append_dev(ul2, t47);
    			append_dev(ul2, li9);
    			append_dev(div2, t49);
    			append_dev(div2, section4);
    			mount_component(subheading6, section4, null);
    			append_dev(section4, t50);
    			append_dev(section4, ul3);
    			append_dev(ul3, li10);
    			append_dev(li10, a6);
    			append_dev(ul3, t52);
    			append_dev(ul3, li11);
    			append_dev(li11, a7);
    			append_dev(ul3, t54);
    			append_dev(ul3, li12);
    			append_dev(li12, a8);
    			append_dev(ul3, t56);
    			append_dev(ul3, li13);
    			append_dev(li13, a9);
    			append_dev(ul3, t58);
    			append_dev(ul3, li14);
    			append_dev(li14, a10);
    			append_dev(ul3, t60);
    			append_dev(ul3, li15);
    			append_dev(li15, a11);
    			append_dev(div2, t62);
    			append_dev(div2, a12);
    			append_dev(a12, t63);
    			append_dev(a12, i);
    			insert_dev(target, t64, anchor);
    			insert_dev(target, footer, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const subheading0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading0_changes.$$scope = { dirty, ctx };
    			}

    			subheading0.$set(subheading0_changes);
    			const subheading1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading1_changes.$$scope = { dirty, ctx };
    			}

    			subheading1.$set(subheading1_changes);
    			const subheading2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading2_changes.$$scope = { dirty, ctx };
    			}

    			subheading2.$set(subheading2_changes);
    			const subheading3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading3_changes.$$scope = { dirty, ctx };
    			}

    			subheading3.$set(subheading3_changes);
    			const highlighttext0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				highlighttext0_changes.$$scope = { dirty, ctx };
    			}

    			highlighttext0.$set(highlighttext0_changes);
    			const highlighttext1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				highlighttext1_changes.$$scope = { dirty, ctx };
    			}

    			highlighttext1.$set(highlighttext1_changes);
    			const subheading4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading4_changes.$$scope = { dirty, ctx };
    			}

    			subheading4.$set(subheading4_changes);
    			const subheading5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading5_changes.$$scope = { dirty, ctx };
    			}

    			subheading5.$set(subheading5_changes);
    			const subheading6_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				subheading6_changes.$$scope = { dirty, ctx };
    			}

    			subheading6.$set(subheading6_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactset.$$.fragment, local);
    			transition_in(subheading0.$$.fragment, local);
    			transition_in(skillset.$$.fragment, local);
    			transition_in(subheading1.$$.fragment, local);
    			transition_in(subheading2.$$.fragment, local);
    			transition_in(subheading3.$$.fragment, local);
    			transition_in(experiencetag0.$$.fragment, local);
    			transition_in(highlighttext0.$$.fragment, local);
    			transition_in(experiencetag1.$$.fragment, local);
    			transition_in(highlighttext1.$$.fragment, local);
    			transition_in(subheading4.$$.fragment, local);
    			transition_in(subheading5.$$.fragment, local);
    			transition_in(subheading6.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactset.$$.fragment, local);
    			transition_out(subheading0.$$.fragment, local);
    			transition_out(skillset.$$.fragment, local);
    			transition_out(subheading1.$$.fragment, local);
    			transition_out(subheading2.$$.fragment, local);
    			transition_out(subheading3.$$.fragment, local);
    			transition_out(experiencetag0.$$.fragment, local);
    			transition_out(highlighttext0.$$.fragment, local);
    			transition_out(experiencetag1.$$.fragment, local);
    			transition_out(highlighttext1.$$.fragment, local);
    			transition_out(subheading4.$$.fragment, local);
    			transition_out(subheading5.$$.fragment, local);
    			transition_out(subheading6.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			detach_dev(script);
    			detach_dev(link3);
    			detach_dev(link4);
    			detach_dev(link5);
    			detach_dev(link6);
    			detach_dev(link7);
    			detach_dev(meta0);
    			detach_dev(meta1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(contactset);
    			destroy_component(subheading0);
    			destroy_component(skillset);
    			destroy_component(subheading1);
    			destroy_component(subheading2);
    			destroy_component(subheading3);
    			destroy_component(experiencetag0);
    			destroy_component(highlighttext0);
    			destroy_component(experiencetag1);
    			destroy_component(highlighttext1);
    			destroy_component(subheading4);
    			destroy_component(subheading5);
    			destroy_component(subheading6);
    			if (detaching) detach_dev(t64);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ExperienceTag,
    		HighlightText,
    		ContactSet,
    		SkillSet,
    		SubHeading
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		themeColor: [0, 0, 0]
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
