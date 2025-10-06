import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../LoginView.vue';

// Mock the router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/main/dashboard', component: { template: '<div>Dashboard</div>' } }],
});

describe('LoginView.vue', () => {
  it('renders the login form', () => {
    const wrapper = mount(LoginView, { 
      global: { plugins: [router] }
    });
    expect(wrapper.find('h1').text()).toBe('Login');
    expect(wrapper.find('#username').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('shows password validation error', async () => {
    const wrapper = mount(LoginView, { 
      global: { plugins: [router] }
    });
    await wrapper.find('#password').setValue('invalid');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.error-message').text()).toContain('비밀번호는 8자 이상이어야 하며');
  });

  it('does not show password validation error for a valid password', async () => {
    const wrapper = mount(LoginView, { 
      global: { plugins: [router] }
    });
    await wrapper.find('#password').setValue('Password123!');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.error-message').exists()).toBe(false);
  });

  it('handles successful login', async () => {
    const push = vi.spyOn(router, 'push');
    const wrapper = mount(LoginView, { 
      global: { 
        plugins: [router],
      }
    });

    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('Password123!');
    await wrapper.find('form').trigger('submit.prevent');

    // Wait for the mock API call
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(push).toHaveBeenCalledWith('/main/dashboard');
  });

  it('handles failed login', async () => {
    const wrapper = mount(LoginView, { 
      global: { plugins: [router] }
    });

    await wrapper.find('#username').setValue('wronguser');
    await wrapper.find('#password').setValue('Password123!');
    await wrapper.find('form').trigger('submit.prevent');

    // Wait for the mock API call
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(wrapper.find('.error-message').text()).toContain('아이디 또는 비밀번호가 일치하지 않습니다.');
  });

  it('shows loading state', async () => {
    const wrapper = mount(LoginView, { 
      global: { plugins: [router] }
    });

    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('Password123!');
    wrapper.find('form').trigger('submit.prevent');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.loading-overlay').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();

    // Wait for the mock API call to finish
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(wrapper.find('.loading-overlay').exists()).toBe(false);
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
  });
});
