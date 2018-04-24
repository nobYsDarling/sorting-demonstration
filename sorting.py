import matplotlib.pyplot as plt
import random
import copy
from matplotlib.animation import FuncAnimation

N = 100


def get_bubble_sort_frames(l):
    f = []

    for e in range(len(l) - 1, 0, -1):
        for i in range(e):
            if l[i] > l[i + 1]:
                temp = l[i]
                l[i] = l[i + 1]
                l[i + 1] = temp

                f.append(copy.copy(l))

    return f


def merge(left, right, frames,  l, pos):
    if not len(left) or not len(right):
        return left or right

    result = []
    i, j = 0, 0
    while len(result) < len(left) + len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
        if i == len(left) or j == len(right):
            result.extend(left[i:] or right[j:])
            break

    l[pos:pos + len(left) + len(right)] = result
    frames.append(copy.copy(l))

    return result


def merge_sort(l, frames, full_list, pos):
    if len(l) < 2:
        return l

    mid = int(len(l) / 2)
    lft = merge_sort(l[:mid], frames, full_list, pos)
    rgt = merge_sort(l[mid:], frames, full_list, pos + mid)

    res = merge(lft, rgt, frames, full_list, pos)

    return res


def get_merge_sort_frames(l):
    f = []

    merge_sort(l, f, l, 0)

    return f


def get_values(n):
    _l = list(range(1, n))

    random.shuffle(_l)

    return _l


def update(frame, frames, bars):
    for bar, yi in zip(bars, frames[frame]):
        bar.set_height(yi)

    return bars


def update_frame(f, bars):
    for bar, yi in zip(bars, f):
        bar.set_height(yi)

    return bars


bubble_sort_frames = get_bubble_sort_frames(get_values(N))
x_data1 = list(range(1, N))
y_data1 = bubble_sort_frames[0]

fig1 = plt.figure()
bars1 = plt.bar(x_data1, y_data1, color='r')
plt.xlim(0, N)
plt.ylim(0, N)
plt.xlabel('Values')
plt.title('Bubble Sort')

for i, frame in enumerate(bubble_sort_frames):
    print('Creating Bubble Sort Frame %d from %d' % (i, len(bubble_sort_frames)))
    update_frame(frame, bars1)
    plt.savefig('frames/bubble_sort/bubble_sort_%d.svg' % i)


merge_sort_frames = get_merge_sort_frames(get_values(N))
x_data2 = list(range(1, N))
y_data2 = merge_sort_frames[0]

fig2 = plt.figure()
bars2 = plt.bar(x_data2, y_data2, color='r')
plt.xlim(0, N)
plt.ylim(0, N)
plt.xlabel('Values')
plt.title('Merge Sort')

for i, frame in enumerate(merge_sort_frames):
    print('Creating Bubble Sort Frame %d from %d' % (i, len(merge_sort_frames)))
    update_frame(frame, bars2)
    plt.savefig('frames/merge_sort/merge_sort_%d.svg' % i)



# ani1 = FuncAnimation(fig1, update, frames=len(bubble_sort_frames), interval=1, fargs=(bubble_sort_frames, bars1))
# ani2 = FuncAnimation(fig2, update, frames=len(merge_sort_frames), interval=1, fargs=(merge_sort_frames, bars2))


exit(1)
