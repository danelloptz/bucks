<template>
    <div class="tree_container">
        <svg
            :width="svgWidth"
            :height="svgHeight"
            :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
            preserveAspectRatio="xMidYMin"
            class="tree_svg"
        >
        <g :transform="`translate(100,0)`">
            <!-- линии -->
            <g>
                <line
                    v-for="(line, i) in lines"
                    :key="'l' + i"
                    :x1="line.x1"
                    :y1="line.y1"
                    :x2="line.x2"
                    :y2="line.y2"
                    stroke="white"
                    stroke-width="2"
                />
            </g>

            <!-- ноды -->
            <g>
                <g
                    v-for="node in flatNodes"
                    :key="node.id"
                >
                    <!-- аватар -->
                    <foreignObject
                        :x="node.x - nodeSize/2"
                        :y="node.y - nodeSize/2"
                        :width="nodeSize"
                        :height="nodeSize"
                    >
                        <div class="avatar_bg">
                            <img class="avatar" :src="AppUserPng" />
                        </div>
                    </foreignObject>

                    <!-- плюс -->
                    <foreignObject
                        v-if="node.level === 3 && node.hasChildren"
                        :x="node.x - 16"
                        :y="node.y + nodeSize/2 + 10"
                        width="32"
                        height="32"
                    >
                        <div
                            class="plus"
                            @click="focusNode(node.raw)"
                        >
                            +
                        </div>
                    </foreignObject>
                </g>
            </g>
        </g>
        </svg>
    </div>
</template>

<script>
    import AppUserPng from '@/assets/images/user.png';
export default {
    name: 'AppBinarTree',

    props: {
        data: Object
    },

    data() {
        return {
            activeRoot: this.data?.tree || null,
            nodeSize: 62,
            levelHeight: 180,
            horizontalGap: 40,
            AppUserPng
        }
    },

     watch: {
        data: {
            immediate: true,
            deep: true,
            handler(val) {
                this.activeRoot = val?.tree || null
            }
        }
    },

    computed: {
        trimmedTree() {
            return this.trimTree(this.activeRoot, 0, 4)
        },

        layout() {
            if (!this.trimmedTree) return { nodes: [], lines: [], width: 800 }

            const nodes = [];
            const lines = [];

            const totalWidth = 600; // ширина всего дерева

            const layoutNode = (node, depth, startX, endX) => {
                const x = (startX + endX) / 2
                const y = 80 + depth * this.levelHeight;

                const hasChildren = node.children?.length > 0;

                nodes.push({
                    id: node.id,
                    x,
                    y,
                    level: depth,
                    raw: node,
                    hasChildren
                });

                if (hasChildren && depth < 3) {
                    let currentX = startX;
                    const childCenters = [];

                    const childWidths = node.children.map(child => 
                        this.countLeaves(child) * (this.nodeSize + this.horizontalGap)
                    );

                    const midY = y + this.levelHeight / 2;
                    const childY = 80 + (depth + 1) * this.levelHeight;

                    // Определяем горизонталь
                    let maxOffset = 0;
                    let tempCurrent = startX;
                    node.children.forEach((child, i) => {
                        const w = childWidths[i];
                        const tempChildX = (tempCurrent + tempCurrent + w) / 2
                        const offset = Math.abs(tempChildX - x);
                        if (offset > maxOffset) maxOffset = offset;
                        tempCurrent += w;
                    });

                    const leftHorizontalEnd  = x - maxOffset;
                    const rightHorizontalEnd = x + maxOffset;

                    // Вертикальная линия от родителя до горизонтали
                    lines.push({
                        x1: x,
                        y1: y + this.nodeSize / 2,
                        x2: x,
                        y2: midY
                    });

                    // Горизонтальная линия
                    lines.push({
                        x1: leftHorizontalEnd,
                        y1: midY,
                        x2: rightHorizontalEnd,
                        y2: midY
                    });

                    // Размещение детей
                    if (node.children.length === 2) {
                        const leftChild  = node.children[0];
                        const rightChild = node.children[1];

                        layoutNode(leftChild, depth + 1,
                            leftHorizontalEnd - childWidths[0]/2,
                            leftHorizontalEnd + childWidths[0]/2
                        );

                        layoutNode(rightChild, depth + 1,
                            rightHorizontalEnd - childWidths[1]/2,
                            rightHorizontalEnd + childWidths[1]/2
                        );

                        childCenters.push({ x: leftHorizontalEnd,  y: childY });
                        childCenters.push({ x: rightHorizontalEnd, y: childY });
                    } else if (node.children.length === 1) {
                        const child = node.children[0];
                        const childCenterX = x;
                        layoutNode(child, depth + 1,
                            childCenterX - childWidths[0]/2,
                            childCenterX + childWidths[0]/2
                        );
                        childCenters.push({ x: childCenterX, y: childY });
                    }

                    // Вертикальные линии к детям
                    childCenters.forEach(child => {
                        lines.push({
                            x1: child.x,
                            y1: midY,
                            x2: child.x,
                            y2: child.y - this.nodeSize / 2
                        });
                    });
                }
            }

            layoutNode(this.trimmedTree, 0, 0, totalWidth);

            return { nodes, lines, width: totalWidth }; // чтобы svg занимала весь центр
        },


        flatNodes() {
            return this.layout.nodes
        },

        lines() {
            return this.layout.lines
        },

        svgWidth() {
            if (!this.layout || !this.layout.nodes.length) return 800;

            // Находим самый левый и самый правый центр ноды
            let minX = Infinity;
            let maxX = -Infinity;

            this.layout.nodes.forEach(node => {
                minX = Math.min(minX, node.x);
                maxX = Math.max(maxX, node.x);
            });

            const leftMostEdge  = minX - this.nodeSize / 2 - 40;  // запас
            const rightMostEdge = maxX + this.nodeSize / 2 + 40;

            return Math.max(800, rightMostEdge - leftMostEdge + 80); // +80 на всякий случай
        },

        svgHeight() {
            return 1200
        }
    },

    methods: {
        trimTree(node, depth, maxDepth) {
            if (!node || depth >= maxDepth) return null

            return {
                ...node,
                children: (node.children || [])
                    .map(child => this.trimTree(child, depth + 1, maxDepth))
                    .filter(Boolean)
            }
        },

        countLeaves(node) {
            if (!node.children?.length) return 1
            return node.children.reduce((sum, c) => sum + this.countLeaves(c), 0)
        },

        focusNode(node) {
            this.activeRoot = node
        }
    }
}
</script>

<style scoped>
.tree_container {
    background: #020a2b;
    overflow-x: auto;
    padding: 60px;
}

.tree_svg {
    display: block;
    margin: 0 auto;
}

.avatar_bg {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #011851;
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.avatar {
    width: 32px;
}

.placeholder {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
}

.plus {
    width: 32px;
    height: 32px;
    background: #1976ff;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
}

.plus:hover {
    transform: scale(1.1);
}
</style>
